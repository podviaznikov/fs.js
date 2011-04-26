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
        value:function(file,callback,readerMethod)
        {
            var reader = new FileReader();
            var initialFile = file;
            reader.onloadend = function(e)
            {
                callback(undefined,this.result,initialFile);
            };
            reader[readerMethod](initialFile);
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

    getDirectoryFromRoot:
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

    readAsArrayBuffer:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,'readAsArrayBuffer',options);
        }
    },
    /**
     * Method reads content of the file as array buffer.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and array buffer.
     * Before using array buffer user should check whether error happened.
     */
    readFileAsArrayBuffer:
    {
        value:function(file,callback)
        {
            this.getReader(file,callback,'readAsArrayBuffer');
        }
    },

    readAsBinaryString:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,'readAsBinaryString',options);
        }
    },

    /**
     * Method reads content of the file as binary string.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string user should check whether error happened.
     */
    readFileAsBinaryString:
    {
        value:function(file,callback)
        {
            this.getReader(file,callback,'readAsBinaryString');
        }
    },

    readAsDataUrl:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,'readAsDataURL',options);
        }
    },

    readAsText:
    {
        value:function(fileName,callback,options)
        {
            this.getReaderUsingFileName(fileName,callback,'readAsText',options);
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

    writeBlobToFile:
    {
        value:function(fileName,blob,callback,options)
        {
            this.getFileFromRoot(fileName,function(err,fileEntry)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    fileEntry.createWriter(function(fileWriter)
                    {
                       fileWriter.onwriteend = function(e)
                       {
                           callback(undefined);
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
                }
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
            this.readFileAsArrayBuffer(file,function(err,arrayBuffer,initialFile)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    var filename = options.filename||initialFile.name;
                    fs.util.writeArrayBufferToFile(filename,file.type,arrayBuffer,callback,options);
                }
            });
        }
    },

    getReaderUsingFileName:
    {
        value:function(fileName,callback,readerMethod,options)
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
                                fs.util.getReader(file,callback,readerMethod);
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

    getFileFromRoot:
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
    },

    createFileURL:
    {
        value:function(filename,callback)
        {
            fs.util.getFileFromRoot(filename,function(er,fileEntry)
            {
                fileEntry.file(function(file)
                {
                    var url=fsURL.createObjectURL(file);
                    callback(url);
                });
            });
        }
    },
    destroyFileURL:
    {
        value:function(url)
        {
            fsURL.revokeObjectURL(url);
        }
    },

    remove:
    {
        value:function(filename,callback)
        {
            this.getFileFromRoot(filename,function(err,fileEntry)
            {
                fileEntry.remove(function()
                {
                    callback(undefined);
                },function(e)
                {
                    callback(e);
                });
            });
        }
    }

});
