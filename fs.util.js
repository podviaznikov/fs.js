/**
 * License
 *
 *(The MIT License)
 *
 * Copyright (c) 2011 Anton Podviaznikov <podviaznikov@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
"use strict";
var global = this;
fs.util= Object.create({},
{
    /**
    * Method obtains reader for the file object.
    * @param file - file object that should be read;
    * @param callback - method that should be called after reader read the file. Callback has 3 parameters: error(if any), result and initial file.
    * @param readerHandler - method over the reader that should be executed.
    */
    getReader:
    {
        value:function(file,callback,readerHandler)
        {
            var reader = new FileReader();
            var initialFile = file;
            reader.onloadend = function(e)
            {
                callback(undefined,this.result,initialFile);
            };
            readerHandler(reader,initialFile);
        }
    },

    getFile:
    {
        value:function(directory,fileName,callback)
        {
            directory.getFile(fileName,{create:true}, function(fileEntry)
            {
                callback(undefined,fileEntry);
            },
            function(err)
            {
                callback(err);
            });
        }
    },

    getDirectory:
    {
        value:function(directory,directoryName,callback)
        {
            callback(undefined,directory.getDirectory(directoryName,{create:true}));
        }
    },

    createDirectory:
    {
        value:function(directoryName,callback,options)
        {
            fs.getNativeFS(function(err,filesystem)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    fs.util.getDirectory(filesystem.root,directoryName,callback);
                }
            },options);
        }
    },
    /**
     * Method reads content of the file as array buffer.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using array buffer user should check whether error happened.
     */
    readFileAsArrayBuffer:
    {
        value:function(file,callback)
        {
            //todo (anton). check how to pass just name of the method 'readAsArrayBuffer'.
            this.getReader(file,callback,function(reader,theFile)
            {
                reader.readAsArrayBuffer(theFile);
            });
        }
    },


    readAsBinaryString:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsBinaryString(file);
            },options);
        }
    },

    readAsArrayBuffer:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsArrayBuffer(file);
            },options);
        }
    },

    readEntriesFromDirectory:
    {
        value:function(directory,callback)
        {
            var directoryReader=directory.createReader();
            directoryReader.readEntries(function(entries)
            {
                callback(undefined,entries);
            },
            function(error)
            {
                callback(error);
            });
        }
    },

    writeBase64StrToFile:
    {
        value:function(fileName,content,contentType,callback,options)
        {
            var blob = fs.base64StringToBlob(content,contentType);
            this.writeBlobToFile(fileName,blob,callback,options);
        }
    },

    readAsDataUrl:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsDataURL(file);
            },options);
        }
    },

    readAsText:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsText(file);
            },options);
        }
    },

    writeBlobToFile:
    {
        value:function(fileName,blob,callback,options)
        {
            this.createFile(fileName,function(err,fileEntry)
            {
                fileEntry.createWriter(function(fileWriter)
                {
                   fileWriter.onwriteend = function(e)
                   {
                       //do nothing after success. Pass nothing to success parameter of the callback
                   };

                   fileWriter.onerror = function(e)
                   {
                       callback(e);
                   };

                   fileWriter.write(blob);
                },
                function(err)
                {
                    callback(err);
                });
            },options);
        }
    },

    writeTextToFile:
    {
        value:function(fileName,text,callback,options)
        {
            var blob = fs.createBlob(text,'text/plain');
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },

    writeArrayBufferToFile:
    {
        value:function(fileName,contentType,arrayBuffer,callback,options)
        {
            var blob = fs.createBlob(arrayBuffer,contentType);
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },

    writeFileToFile:
    {
        value:function(file,callback,options)
        {
            this.readFileAsArrayBuffer(file,function(err,arrayBuffer)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    fs.util.writeArrayBufferToFile(file.name,file.type,arrayBuffer,callback,options);
                }
            });
        }
    },

    getReaderUsingFileName:
    {
        value:function(fileName,callback,parentCallback,options)
        {
            fs.getNativeFS(function(err,filesystem)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    filesystem.root.getFile(fileName, {}, function(fileEntry)
                    {
                        if(fileEntry.isFile === true)
                        {
                            // Get a File object representing the file,
                            // then use FileReader to read its contents.
                            fileEntry.file(function(file)
                            {
                                fs.util.getReader(file,callback,parentCallback);
                            },
                            function(error)
                            {
                                callback(error);
                            });
                        }
                        else
                        {
                            callback(fs.FILE_EXPECTED);
                        }
                    },
                    function(error)
                    {
                        callback(error);
                    });
                }
            },options);
        }
    },

    createFile:
    {
        value:function(fileName,callback,options)
        {
            fs.getNativeFS(function(err,filesystem)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    fs.util.getFile(filesystem.root,fileName,callback);
                }
            },options);
        }
    }

});
