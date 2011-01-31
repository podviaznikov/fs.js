"use strict";
var fs = Object.create({},
{
    /**
     * Configuration property. Indicates whether to use logging.
     * Default value is <code>false</code> but can be changed.
     */
    log:
    {
        value:false,
        writable:true
    },
    /**
     * Configuration property. Specifies the size of preserved space in file system.
     * Default value is 5 GB but can be changed.
     */    
    maxSize:
    {
        //default value is 5 GB
        value:5*1020*1024*1024,
        writable:true
    },
    /* READING FILES*/
    /**
     * Method reads content of the file as dataURL.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using dataURL user should check whether error happened.
     */
    readAsDataURL:
    {
        value:function(fileName,callback)
        {
            this._getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsDataURL(file);
            });
        }
    },
    /**
     * Method reads content of the file as plain text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    readAsText:
    {
        value:function(fileName,callback)
        {
            this._getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsText(file);
            });
        }
    },
    /**
     * Method reads content of the file as plain text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    readFileAsText:
    {
        value:function(file,callback)
        {
            //TODO(anton) some mess with parameters. file, theFile???
            this._getReader(file,callback,function(reader,theFile)
            {
                reader.readAsText(theFile);
            });
        }
    },

    readAsBinaryString:
    {
        value:function(fileName,callback)
        {
            this._getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsBinaryString(file);
            });
        }
    },
    readAsArrayBuffer:
    {
        value:function(fileName,callback)
        {
            this._getReaderUsingFileName(fileName,callback,function(reader,file)
            {
                reader.readAsArrayBuffer(file);
            });
        }
    },
    /* WRITING DATA*/
    createFile:
    {
        value:function(fileName,callback)
        {
            this._getNativeFS(function(err,fs)
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
        }
     },
    writeBlob:
    {
        value:function(fileName,blob,callback)
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
        }
    },     
    writeText:
    {
        value:function(fileName,text,callback)
        {
            var blobBuilder = new BlobBuilder();
            blobBuilder.append(text);
            this.writeBlob(fileName,blobBuilder.getBlob('text/plain'),callback);
        }
    },
    writeDataURL:
    {
        value:function(fileName,content,contentType,callback)
        {
            this.writeBlob(fileName,this._dataStringToBlob(content,contentType),callback);
        }
    },
    /* PRIVATE METHODS. Should be hidden somehow */
    _getNativeFS:
    {
        value:function(callback)
        {
            window.requestFileSystem(window.PERSISTENT, this.maxSize, function(fs)
            {
                callback(undefined,fs);
            },
            /* error callback*/
            function(err)
            {
                callback(err);
            });
        }
    },
    _getReaderUsingFileName:
    {
        value:function(fileName,callback,parentCallback)
        {
            var self = this;
            this._getNativeFS(function(err,fs)
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
                                self._getReader(file,callback,parentCallback);
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
        }
    },
    _getReader:
    {
        value:function(file,callback,parentCallback)
        {
            var reader = new FileReader();
            reader.onloadend = function(e)
            {
                callback(undefined,this.result);
            };
            parentCallback(reader,file);
        }
    },
    _dataStringToBlob:
    {
        value:function(dataString,type)
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
        }
    }

});

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