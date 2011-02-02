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
    /* PRIVATE METHODS. Should be hidden somehow */
     var _getNativeFS=function(callback)
     {
         if (global.requestFileSystem)
         {
             global.requestFileSystem(global.PERSISTENT, this.maxSize, function(fs)
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
             //should be changed
             callback('Filesystem is not supported');
         }
     };

     var _getReaderUsingFileName=function(fileName,callback,parentCallback)
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
                         callback(FileError.FILE_EXPECTED);
                     }
                 },
                 function(error)
                 {
                     callback(error);
                 });
             }
         });
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
     var _dataStringToBlob=function(dataString,type)
     {
         var encodedString = atob(dataString);
         var dataLength = encodedString.length;
         var arrayData = new Int8Array(dataLength);
         for(var i = 0; i < dataLength; i++)
         {
             arrayData[i] = encodedString.charCodeAt(i)
         }
         var blobBuilder = new BlobBuilder();
         blobBuilder.append(arrayData.buffer);
         return blobBuilder.getBlob(type);
     };

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
        /* READING FILES*/
        /**
         * Method reads content of the file as dataURL.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using dataURL user should check whether error happened.
         */
        readAsDataURL:function(fileName,callback)
        {
            _getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsDataURL(file);
            });
        },

        /**
         * Method reads content of the file as plain text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and text.
         * Before using text user should check whether error happened.
         */
        readAsText:function(fileName,callback)
        {
            _getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsText(file);
            });
        },
        
        /**
         * Method reads content of the file as plain text.
         * @param fileName - name of the file in the file system.
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

        readFileAsDataURL:function(file,callback)
        {
            //TODO(anton) some mess with parameters. file, theFile???
            _getReader(file,callback,function(reader,theFile)
            {
                reader.readAsDataURL(theFile);
            });
        },

        readFileAsArrayBuffer:function(file,callback)
        {
            //TODO(anton) some mess with parameters. file, theFile???
            _getReader(file,callback,function(reader,theFile)
            {
                reader.readAsArrayBuffer(theFile);
            });
        },


        /**
         * Method reads content of the file as binary text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
         * Before using binary string result user should check whether error happened.
         */
        readAsBinaryString:function(fileName,callback)
        {
            _getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsBinaryString(file);
            });
        },

        readAsArrayBuffer:function(fileName,callback)
        {
            _getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsArrayBuffer(file);
            });
        },

        /* WRITING DATA*/
        createFile:function(fileName,callback)
        {
            _getNativeFS(function(err,fs)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    fs.root.getFile(fileName,{create:true}, function(fileEntry)
                    {
                        callback(undefined,fileEntry);
                    },
                    function(err)
                    {
                       callback(err);
                    });
                }
            });
        },
        writeFile:function(file,callback)
        {
            this.readFileAsArrayBuffer(file,function(err,arrayBuffer)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    var blobBuilder = new BlobBuilder();
                    blobBuilder.append(arrayBuffer);
                    this.writeBlob(file.name,blobBuilder.getBlob(file.type),callback);
                }
            });
        },
        /**
         * Method for writing blob to file.
         *
         * @param fileName - filename in which data should be written. File will be created.
         * @param blob - content of the file.
         * @param callback - callback after execution may contain only one parameter: error.
         */
        writeBlob:function(fileName,blob,callback)
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
            });
        },
        /**
         * Method for writing text to the file.
         *
         * @param fileName - name of the file. File will be created.
         * @param text - text (multi line using \r\n) that should be written.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeText:function(fileName,text,callback)
        {
            var blobBuilder = new BlobBuilder();
            blobBuilder.append(text);
            this.writeBlob(fileName,blobBuilder.getBlob('text/plain'),callback);
        },

        /**
         * Method for writing base64 encoded string to file.
         *
         * @param fileName - name of the file. File will be created.
         * @param content - encoded string.
         * @param contentType - content type.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeDataURL:function(fileName,content,contentType,callback)
        {
            if(atob)
            {
                this.writeBlob(fileName,_dataStringToBlob(content,contentType),callback);
            }
            else
            {
                //imagine error code
                //TODO (anton) rethink it!
                callback("Decoding function isn't supported");
            }
        }

    }
})();

/** Standard interface extensions */
/**
 * Method shortName for the file will return just name of the file without extension.
 *
 * @return name of the file without extension.
 */
Object.defineProperty(File.prototype,
'shortName',
{
    value:function()
    {
        var dotIndex = this.name.lastIndexOf('.');
        return this.name.substring(0,dotIndex);
    }
});

/**
 * Method extension for the file will return just extension.
 *
 * @return extension of the file.
 */
Object.defineProperty(File.prototype,
'extension',
{
    value:function()
    {
        var dotIndex = this.name.lastIndexOf('.');
        return this.name.substring(dotIndex);
    }
});

/**
 * Define custom error code. This error code used when file is expected but
 * folder was gotten.
 *
 * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
 */
Object.defineProperty(FileError.prototype,'FILE_EXPECTED',
{
    value:6
});

/**
 * Method return readable explanation for the error codes.
 *
 * @return message description for the standard error codes.
 * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
 */
Object.defineProperty(FileError.prototype,
'message',
{
    value:function()
    {
        var msg='';
        switch (this.code)
        {
            case FileError.QUOTA_EXCEEDED_ERR:
              msg = 'QUOTA_EXCEEDED_ERR';
              break;
            case FileError.NOT_FOUND_ERR:
              msg = 'NOT_FOUND_ERR';
              break;
            case FileError.SECURITY_ERR:
              msg = 'SECURITY_ERR';
              break;
            case FileError.INVALID_MODIFICATION_ERR:
              msg = 'INVALID_MODIFICATION_ERR';
              break;
            case FileError.INVALID_STATE_ERR:
              msg = 'INVALID_STATE_ERR';
              break;
            case FileError.FILE_EXPECTED:
              msg = 'FILE_EXPECTED';
              break;              
            default:
              msg = 'Unknown Error';
              break;
        };
        return msg;
    }
});
