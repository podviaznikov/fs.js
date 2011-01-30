"use strict";
var fs = Object.create({},
{
    log:
    {
        value:false,
        writable:true
    },
    maxSize:
    {
        //default value is 5 GB
        value:5*1020*1024*1024,
        writable:true
    },
    /** operations for reading files*/
    readFileAsDataURL:
    {
        value:function(fileName,callback)
        {
            this._getFileReader(fileName,callback,function(reader,file)
            {
                reader.readAsDataURL(file);
            });
        }
    },
    readFileAsText:
    {
        value:function(fileName,callback)
        {
            this._getFileReader(fileName,callback,function(reader,file)
            {
                reader.readAsText(file);
            });
        }
    },
    readFileAsBinaryString:
    {
        value:function(fileName,callback)
        {
            this._getFileReader(fileName,callback,function(reader,file)
            {
                reader.readAsBinaryString(file);
            });
        }
    },
    readFileAsArrayBuffer:
    {
        value:function(fileName,callback)
        {
            this._getFileReader(fileName,callback,function(reader,file)
            {
                reader.readAsArrayBuffer(file);
            });
        }
    },
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
    _getFileReader:
    {
        value:function(fileName,callback,parentCallback)
        {
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
                                var reader = new FileReader();

                                reader.onloadend = function(e)
                                {
                                    callback(undefined,this.result);
                                };
                                parentCallback(reader,file);
                            },
                            function(error)
                            {
                                callback(error);
                            });
                        }
                        else
                        {
                            //TODO: error codes should be here
                            callback();
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
    /** operations for writing files*/
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
    writeText:
    {
        value:function(fileName,text,callback)
        {
            this.createFile(fileName,function(err,fileEntry)
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
                   var blobBuilder = new BlobBuilder('plain/text');
                   blobBuilder.append(text);
                   fileWriter.write(blobBuilder.getBlob('plain/text'));

                },
                function(err)
                {
                    callback(err);    
                });
            });
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
 * Method return readable explanation for the error codes.
 *
 * @return message description for the standard error codes.
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
            default:
              msg = 'Unknown Error';
              break;
        };
        return msg;
    }
});
