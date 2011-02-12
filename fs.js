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
var fs = (function()
{
    /* PRIVATE METHODS.*/
     var _getNativeFS=function(callback,options)
     {
         if (global.requestFileSystem)
         {
             var scope = global.PERSISTENT;
             if(options && options.tmp)
             {
             	scope = global.TEMPORARY;
             }
             global.requestFileSystem(scope, this.maxSize, function(fs)
             {
                 callback(undefined,fs);
             },
             /* error callback*/
             function(err)
             {
                 callback(err);
             });
         }
         else
         {
             callback(fs.BROWSER_NOT_SUPPORTED);
         }
     };

     var _getReaderUsingFileName=function(fileName,callback,parentCallback,options)
     {
         _getNativeFS(function(err,fs)
         {
             if(err)
             {
                 callback(err);
             }
             else
             {
                 fs.root.getFile(fileName, {}, function(fileEntry)
                 {
                     if(fileEntry.isFile === true)
                     {
                         // Get a File object representing the file,
                         // then use FileReader to read its contents.
                         fileEntry.file(function(file)
                         {
                             _getReader(file,callback,parentCallback);
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
     };
     var _getReader=function(file,callback,parentCallback)
     {
         var reader = new FileReader();
         reader.onloadend = function(e)
         {
             callback(undefined,this.result);
         };
         parentCallback(reader,file);
     };
     var _dataStringToBlob=function(dataString,type,callback)
     {
         if(atob && Int8Array)
         {
            var encodedString = atob(dataString);
            var dataLength = encodedString.length;
            var arrayData = new Int8Array(dataLength);
            for(var i = 0; i < dataLength; i++)
            {
                arrayData[i] = encodedString.charCodeAt(i)
            }
            callback(undefined,this.createBlob(arrayData.buffered,type));
         }
         else
         {
             callback(fs.BROWSER_NOT_SUPPORTED);
         }
     };
     var _getFile=function(directory,fileName,callback)
     {
         directory.getFile(fileName,{create:true}, function(fileEntry)
         {
             callback(undefined,fileEntry);
         },
         function(err)
         {
             callback(err);
         });
     };

    var _createFile=function(fileName,callback,options)
	{
	    _getNativeFS(function(err,fs)
	    {
            if(err)
            {
                callback(err);
            }
            else
            {
                _getFile(fs.root,fileName,callback);
            }
	    },options);
	};
    var _writeBlobToFile=function(fileName,blob,callback,options)
    {
        this.createFile(fileName,function(err,fileEntry)
        {
            fileEntry.createWriter(function(fileWriter)
            {
               fileWriter.onwriteend = function(e)
               {
                   //do nothing after success. Pass nothing to success parameter of the callback
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
        },options);
    };

    var _writeTextToFile=function(fileName,text,callback,options)
    {
        var blob = this.createBlob(text,'text/plain');
        _writeBlobToFile(fileName,blob,callback,options);
    };

    var _writeArrayBufferToFile=function(fileName,contentType,arrayBuffer,callback,options)
    {
        var blob = this.createBlob(arrayBuffer,contentType);
        _writeBlobToFile(fileName,blob,callback,options);
    };

    var _writeFileToFile=function(file,callback,options)
    {
        this.readFileAsArrayBuffer(file,function(err,arrayBuffer)
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                _writeArrayBufferToFile(file.name,file.type,arrayBuffer,callback,options);
            }
        });
    };
    var _writeBase64StrToFile=function(fileName,content,contentType,callback,options)
    {
        _dataStringToBlob(content,contentType,function(err,blob)
        {
           if(err)
           {
               callback(err);
           }
           else
           {
               _writeBlobToFile(fileName,blob,callback,options);
           }
        });
    };

    var _readAsDataUrl=function(fileName,callback,options)
    {
        _getReaderUsingFileName(fileName,callback,function(reader,file)
        {
            reader.readAsDataURL(file);
        },options);
    };

    var _readAsText=function(fileName,callback,options)
    {
        _getReaderUsingFileName(fileName,callback,function(reader,file)
        {
            reader.readAsText(file);
        },options);
    };

    var _readAsBinaryString=function(fileName,callback,options)
    {
        _getReaderUsingFileName(fileName,callback,function(reader,file)
        {
            reader.readAsBinaryString(file);
        },options);
    };

    var _readAsArrayBuffer=function(fileName,callback,options)
    {
        _getReaderUsingFileName(fileName,callback,function(reader,file)
        {
            reader.readAsArrayBuffer(file);
        },options);
    };


    var _getDirectory=function(directory,directoryName,callback)
    {
        callback(undefined,directory.getDirectory(directoryName,{create:true}));
    };

    var _createDirectory=function(directoryName,callback,options)
    {
        _getNativeFS(function(err,fs)
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                _getDirectory(fs.root,directoryName,callback);
            }
        },options);
    };

    var _readEntriesFromDirectory=function(directory,callback)
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
    return {
        /**
         * Configuration property. Indicates whether to use logging.
         * Default value is <code>false</code> but can be changed.
         */
        log:false,
        /**
         * Configuration property. Specifies the size of preserved space in file system.
         * Default value is 5 GB but can be changed.
         */
        maxSize:5*1020*1024*1024,

        createBlob:function(content,contentType)
        {
            var blobBuilder = new BlobBuilder();
            blobBuilder.append(content);
            return blobBuilder.getBlob(contentType);
        },
        /* READING FILES*/

        /**
         * Method reads content of the file as dataURL.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using dataURL user should check whether error happened.
         */
        readAsDataUrl:function(fileName,callback)
        {
            _readAsDataUrl(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as dataURL.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using dataURL user should check whether error happened.
         */
        readTmpFileAsDataUrl:function(fileName,callback)
        {
            _readAsDataUrl(fileName,callback,{tmp:true});
        },

        /**
         * Method reads content of the file as plain text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and text.
         * Before using text user should check whether error happened.
         */
        readAsText:function(fileName,callback)
        {
            _readAsText(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as plain text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and text.
         * Before using text user should check whether error happened.
         */
        readTmpFileAsText:function(fileName,callback)
        {
            _readAsText(fileName,callback,{tmp:true});
        },

        /**
         * Method reads content of the file as binary text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
         * Before using binary string result user should check whether error happened.
         */
        readAsBinaryString:function(fileName,callback)
        {
            _readAsBinaryString(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as binary text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
         * Before using binary string result user should check whether error happened.
         */
        readTmpFileAsBinaryString:function(fileName,callback)
        {
            _readAsBinaryString(fileName,callback,{tmp:true});
        },

        /**
         * Method reads content of the file as array buffer.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using array buffer user should check whether error happened.
         */
        readAsArrayBuffer:function(fileName,callback)
        {
            _readAsArrayBuffer(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as array buffer.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using array buffer user should check whether error happened.
         */
        readTmpFileAsArrayBuffer:function(fileName,callback)
        {
            _readAsArrayBuffer(fileName,callback,{tmp:true});
        },
        

        /**
         * Method reads content of the file as plain text.
         * @param file - file object.
         * @param callback - callback after operation is done. Has 2 parameters: error and text.
         * Before using text user should check whether error happened.
         */
        readFileAsText:function(file,callback)
        {
            //TODO(anton) some mess with parameters. file, theFile???
            _getReader(file,callback,function(reader,theFile)
            {
                reader.readAsText(theFile);
            });
        },

        /**
         * Method reads content of the file as dataURL.
         * @param file - file object.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using datURL user should check whether error happened.
         */
        readFileAsDataURL:function(file,callback)
        {
            //TODO(anton) some mess with parameters. file, theFile???
            _getReader(file,callback,function(reader,theFile)
            {
                reader.readAsDataURL(theFile);
            });
        },
        
        /**
         * Method reads content of the file as array buffer.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using array buffer user should check whether error happened.
         */
        readFileAsArrayBuffer:function(file,callback)
        {
            //TODO(anton) some mess with parameters. file, theFile???
            _getReader(file,callback,function(reader,theFile)
            {
                reader.readAsArrayBuffer(theFile);
            });
        },

        /* Files and Directories*/

        createFile:function(fileName,callback)
        {
            _createFile(fileName,callback,{});
        },
        createTmpFile:function(fileName,callback)
        {
            _createFile(fileName,callback,{tmp:true});
        },

        createDirectory:function(directoryName,callback)
        {
            _createDirectory(directoryName,callback,{});
        },

        createTmpDirectory:function(directoryName,callback)
        {
            _createDirectory(directoryName,callback,{tmp:true});  
        },

        /* WRITING DATA*/
        writeFileToFile:function(file,callback)
        {
            _writeFileToFile(file,callback,{});
        },

        writeFileToTmpFile:function(file,callback)
        {
            _writeFileToFile(file,callback,{tmp:true});
        },
        
        /**
         * Method for writing blob to file.
         *
         * @param fileName - filename in which data should be written. File will be created.
         * @param blob - content of the file.
         * @param callback - callback after execution may contain only one parameter: error.
         */
        writeBlobToFile:function(fileName,blob,callback)
        {
            _writeBlobToFile(fileName,blob,callback,{});
        },
        
        /**
         * Method for writing blob to temp file.
         *
         * @param fileName - filename in which data should be written. File will be created.
         * @param blob - content of the file.
         * @param callback - callback after execution may contain only one parameter: error.
         */
        writeBlobToTmpFile:function(fileName,blob,callback)
        {
            _writeBlobToFile(fileName,blob,callback,{tmp:true});
        },

        /**
         * Method for writing text to the file.
         *
         * @param fileName - name of the file. File will be created.
         * @param text - text (multi line using \r\n) that should be written.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeTextToFile:function(fileName,text,callback)
        {
            _writeTextToFile(fileName,text,callback,{});
        },

        /**
         * Method for writing text to the temporary file.
         *
         * @param fileName - name of the file. File will be created.
         * @param text - text (multi line using \r\n) that should be written.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeTextToTmpFile:function(fileName,text,callback)
        {
            _writeTextToFile(fileName,text,callback,{tmp:true});
        },

        /**
         * Method for writing base64 encoded string to file.
         *
         * @param fileName - name of the file. File will be created.
         * @param content - encoded string.
         * @param contentType - content type.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeBase64StrToFile:function(fileName,content,contentType,callback)
        {
            _writeBase64StrToFile(fileName,content,contentType,callback,{});
        },

         /**
         * Method for writing base64 encoded string to temp file.
         *
         * @param fileName - name of the file. File will be created.
         * @param content - encoded string.
         * @param contentType - content type.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeBase64StrToTmpFile:function(fileName,content,contentType,callback)
        {
            _writeBase64StrToFile(fileName,content,contentType,callback,{tmp:true});
        },
        /*Directories*/
        readDirectory:function(directoryName,callback)
        {
            _getDirectory(directoryName,function(err,directory)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    _readEntriesFromDirectory(directory,callback);        
                }
            },{});
        },

        readRootDirectory:function(callback)
        {
            _getNativeFS(function(err,fs)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    _readEntriesFromDirectory(fs.root,callback);        
                }
            },{});
        }

    }
})();

/**
 * Define custom error code. This error code used when file is expected but
 * folder was gotten.
 *
 * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
 */
Object.defineProperty(fs,'FILE_EXPECTED',
{
    value:6
});

/**
 * Define custom error code. This error code used when browser doesn't support
 * one of the requested features.
 *
 * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
 */
Object.defineProperty(fs,'BROWSER_NOT_SUPPORTED',
{
    value:7
});