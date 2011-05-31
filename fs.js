// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
var global = this,fs;
//fixing API method names
global.requestFileSystem = global.requestFileSystem || global.webkitRequestFileSystem;
global.BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder;
global.resolveLocalFileSystemURL = global.resolveLocalFileSystemURL || global.webkitResolveLocalFileSystemURL;
global.fsURL = global.URL || global.webkitURL;
fs=Object.create({},{
    /**
     * Version of the lib
     */
    version:{value:'0.9'},
    /**
     * Configuration property. Indicates whether to use logging.
     * Default value is <code>false</code> but can be changed.
     */
    log:{value:false,writable:true},
    /**
     * Configuration property. Specifies the size of preserved space in file system.
     * Default value is 10 GB but can be changed.
     */
    maxSize:{value:10*1020*1024*1024,writable:true},
    /**
     * Define custom error code. This error code used when file is expected but
     * folder was gotten.
     *
     * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
     */
    FILE_EXPECTED:{value:50},
    /**
     * Define custom error code. This error code used when browser doesn't support
     * one of the requested features.
     *
     * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
     */
    BROWSER_NOT_SUPPORTED:{value:51},

    /**
     * Get reference to the FileSystem.
     * @param callback with: error or FileSystem object
     * @param options: tmp option identifies that temporary FileSystem should be obtained.
     */
    getNativeFS:{
        value:function(callback,options){
            if (global.requestFileSystem){
                var scope = global.PERSISTENT;
                if(options && options.tmp){
                    scope = global.TEMPORARY;
                }
                global.requestFileSystem(scope, this.maxSize,function(fs){
                    callback(undefined,fs);
                },
                /* error callback*/
                function(err){
                    callback(err);
                });
            }else{
                callback(fs.BROWSER_NOT_SUPPORTED);
            }
        }
    },
    /**
     * Create blob for given content and content/type.
     *
     * @return blob.
     */
    createBlob:{
        value:function(content,contentType){
            var blobBuilder = new global.BlobBuilder();
            blobBuilder.append(content);
            return blobBuilder.getBlob(contentType);
        }
    },
    /**
     * Method for converting base64 string to blob.
     * @param base64String - string that should be converted.
     * @param type - content type for the blob.
     * @return blob converted from original content.
     */
    base64StringToBlob:{
        value:function(base64String,type){
            var decodedString  = global.atob(base64String),
                dataLength = decodedString.length,
                arrayData = new global.Int8Array(dataLength),
                i=0;
            for(i = 0; i < dataLength; i++){
                arrayData[i] = decodedString .charCodeAt(i);
            }
            return this.createBlob(arrayData.buffer,type);
        }
    }
});
// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
/**
 * Method shortName for the file will return just name of the file without extension.
 *
 * @return name of the file without extension.
 */
Object.defineProperty(global.File.prototype,
'shortName',{
    value:function(){
        var dotIndex = this.name.lastIndexOf('.');
        return this.name.substring(0,dotIndex);
    }
});

/**
 * Method extension for the file will return just extension.
 *
 * @return extension of the file.
 */
Object.defineProperty(global.File.prototype,
'extension',{
    value:function(){
        var dotIndex = this.name.lastIndexOf('.');
        return this.name.substring(dotIndex);
    }
});

/**
 * Method for getting size of the file in KB.
 *
 * @return size of the file in KB.
 */
Object.defineProperty(global.File.prototype,
'sizeInKB',{
    value:function(){
        return (this.size/(1014)).toFixed(1);
    }
});
/**
 * Method for getting size of the file in MB.
 *
 * @return size of the file in MB.
 */
Object.defineProperty(global.File.prototype,
'sizeInMB',{
    value:function()
    {
         return (this.size/(1024*1014)).toFixed(1);
    }
});
/**
 * Method for getting size of the file in GB.
 *
 * @return size of the file in GB.
 */
Object.defineProperty(global.File.prototype,
'sizeInGB',{
    value:function(){
        return (this.size/(1024*1014*1024)).toFixed(1);
    }
});
/**
 * Method return readable explanation for the error codes.
 *
 * @return message description for the standard error codes.
 * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
 */
 //todo check this http://dev.w3.org/2009/dap/file-system/file-writer.html!!
Object.defineProperty(global.FileError.prototype,
'message',{
    value:function(){
        var msg=this.code;
//        switch (this.code){
//            case global.FileError.ENCODING_ERR:
//              msg = 'ENCODING_ERR';
//              break;
//            case global.FileError.NOT_FOUND_ERR:
//              msg = 'NOT_FOUND_ERR';
//              break;
//            case global.FileError.SECURITY_ERR:
//              msg = 'SECURITY_ERR';
//              break;
//            case global.FileError.ABORT_ERR:
//              msg = 'ABORT_ERR';
//              break;
//            case global.FileError.NOT_READABLE_ERR:
//              msg = 'NOT_READABLE_ERR';
//              break;
//            case global.FileError.NO_MODIFICATION_ALLOWED_ERR:
//              msg = 'NO_MODIFICATION_ALLOWED_ERR';
//            case global.FileError.NO_MODIFICATION_ALLOWED_ERR:
//              msg = 'NO_MODIFICATION_ALLOWED_ERR';
//            case fs.FILE_EXPECTED:
//              msg = 'FILE_EXPECTED';
//              break;
//            case fs.BROWSER_NOT_SUPPORTED:
//              msg = 'BROWSER_NOT_SUPPORTED';
//              break;
//            default:
//              msg = 'UNKNOWN_ERROR';
//              break;
//        };
        return msg;
    }
});
// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
fs.io = Object.create({},{
    /* Files and Directories*/
    createFile:{
        value:function(fileName,callback){
            fs.util.getFileFromRoot(fileName,callback,{});
        }
    },
    createTmpFile:{
        value:function(fileName,callback){
            fs.util.getFileFromRoot(fileName,callback,{tmp:true});
        }
    },
    createDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectoryFromRoot(directoryName,callback,{});
        }
    },
    createTmpDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectoryFromRoot(directoryName,callback,{tmp:true});
        }
    },

    /*Directories*/
    readDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectory(directoryName,function(err,directory){
                if(err){//error
                    callback(err);
                }else{//success
                    fs.util.readEntriesFromDirectory(directory,callback);
                }
            },{});
        }
    },
    readRootDirectory:{
        value:function(callback){
            fs.getNativeFS(function(err,filesystem){
                if(err){//error
                    callback(err);
                }else{//success
                    fs.util.readEntriesFromDirectory(filesystem.root,callback);
                }
            },{});
        }
    }
});
// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
fs.util= Object.create({},{
    /**
    * Method obtains reader for the file object.
    * @param file - file object that should be read;
    * @param callback - method that should be called after reader read the file. Callback has 3 parameters: error(if any), result and initial file.
    * @param readerHandler - method over the reader that should be executed.
    */
    getReader:{
        value:function(file,callback,readerMethod){
            var reader = new global.FileReader();
            var initialFile = file;
            reader.onloadend = function(e)
            {
                //pass read data into the callback
                callback(undefined,this.result,initialFile);
            };
            reader[readerMethod](initialFile);
        }
    },

    getFile:{
        value:function(directory,fileName,callback){
            //success
            directory.getFile(fileName,{create:true,exclusive: true}, function(fileEntry){
                callback(undefined,fileEntry);
            },
            //error
            function(err){
                callback(err);
            });
        }
    },

    getDirectory:{
        value:function(directory,directoryName,callback){
            callback(undefined,directory.getDirectory(directoryName,{create:true}));
        }
    },

    getDirectoryFromRoot:{
        value:function(directoryName,callback,options){
            fs.getNativeFS(function(err,filesystem){
                if(err){
                    callback(err);
                }else{
                    fs.util.getDirectory(filesystem.root,directoryName,callback);
                }
            },options);
        }
    },

    readEntriesFromDirectory:{
        value:function(directory,callback){
            var directoryReader=directory.createReader();
            directoryReader.readEntries(function(entries){
                callback(undefined,entries);
            },
            function(error){
                callback(error);
            });
        }
    },

    readAsArrayBuffer:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsArrayBuffer',options);
        }
    },
    /**
     * Method reads content of the file as array buffer.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and array buffer.
     * Before using array buffer user should check whether error happened.
     */
    readFileAsArrayBuffer:{
        value:function(file,callback){
            this.getReader(file,callback,'readAsArrayBuffer');
        }
    },

    readAsBinaryString:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsBinaryString',options);
        }
    },

    /**
     * Method reads content of the file as binary string.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string user should check whether error happened.
     */
    readFileAsBinaryString:{
        value:function(file,callback){
            this.getReader(file,callback,'readAsBinaryString');
        }
    },

    readAsDataUrl:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsDataURL',options);
        }
    },

    readAsText:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsText',options);
        }
    },

    writeBase64StrToFile:{
        value:function(fileName,content,contentType,callback,options){
            var blob = fs.base64StringToBlob(content,contentType);
            this.writeBlobToFile(fileName,blob,callback,options);
        }
    },

    writeBlobToFile:{
        value:function(fileName,blob,callback,options){
            this.getFileFromRoot(fileName,function(err,fileEntry){
                if(err){
                    callback(err);
                }else{
                    fileEntry.createWriter(function(fileWriter){
                        fileWriter.onwriteend = function(){
                            console.log('File saved to FS');
                            callback(undefined);
                        };
                        fileWriter.onerror = function(){
                            console.log('Error writing file:'+this.error);
                            callback(this.error);
                        };

                        fileWriter.write(blob);
                    },function(err){callback(err);});
                }
            },options);
        }
    },

    writeTextToFile:{
        value:function(fileName,text,callback,options){
            var blob = fs.createBlob(text,'text/plain');
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },

    writeArrayBufferToFile:{
        value:function(fileName,contentType,arrayBuffer,callback,options){
            var blob = fs.createBlob(arrayBuffer,contentType);
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },

    writeFileToFile:{
        value:function(file,callback,options){
            var filename = options.filename||file.name;
            this.getFileFromRoot(filename,function(err,fileEntry){
                if(err){
                    callback(err);
                }else{
                    fileEntry.createWriter(function(fileWriter){
                        fileWriter.onwriteend = function(){
                            console.log('File saved to FS');
                            callback(undefined);
                        };
                        fileWriter.onerror = function(){
                            console.log('Error writing file:'+this.error);
                            callback(this.error);
                        };
                        fileWriter.write(file);
                    },function(err){callback(err);});
                }
            },options);
        }
    },

    getReaderUsingFileName:{
        value:function(fileName,callback,readerMethod,options)
        {
            fs.getNativeFS(function(err,filesystem){
                if(err){
                    callback(err);
                }else{
                    filesystem.root.getFile(fileName, {}, function(fileEntry){
                        //we got file
                        if(fileEntry.isFile === true){
                            // Get a File object representing the file,
                            // then use FileReader to read its contents.
                            fileEntry.file(function(file){
                                fs.util.getReader(file,callback,readerMethod);
                            },
                            //error
                            function(error){
                                callback(error);
                            });
                         //not file
                        }else{
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

    getFileFromRoot:{
        value:function(fileName,callback,options){
            fs.getNativeFS(function(err,filesystem){
                if(err){
                    callback(err);
                }else{
                    fs.util.getFile(filesystem.root,fileName,callback);
                }
            },options);
        }
    },

    createFileURL:{
        value:function(filename,callback){
            fs.util.getFileFromRoot(filename,function(er,fileEntry){
                fileEntry.file(function(file){
                    var url=fsURL.createObjectURL(file);
                    callback(url);
                });
            });
        }
    },
    destroyFileURL:{
        value:function(url){fsURL.revokeObjectURL(url);}
    },

    remove:{
        value:function(filename,callback){
            this.getFileFromRoot(filename,function(err,fileEntry){
                //success
                fileEntry.remove(function(){callback(undefined);},
                //error
                function(e){callback(e);});
            });
        }
    }

});


// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
fs.read = Object.create({},{
    /**
     * Method reads content of the file as dataURL.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using dataURL user should check whether error happened.
     */
    asDataUrl:{
        value:function(fileName,callback){
            fs.util.readAsDataUrl(fileName,callback,{});
        }
    },
    /**
     * Method reads content of the temporary file as dataURL.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using dataURL user should check whether error happened.
     */
    tmpFileAsDataUrl:{
        value:function(fileName,callback){
            fs.util.readAsDataUrl(fileName,callback,{tmp:true});
        }
    },
    /**
     * Method reads content of the file as plain text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    asText:{
        value:function(fileName,callback){
            fs.util.readAsText(fileName,callback,{});
        }
    },
    /**
     * Method reads content of the temporary file as plain text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    tmpFileAsText:{
        value:function(fileName,callback){
            fs.util.readAsText(fileName,callback,{tmp:true});
        }
    },
    /**
     * Method reads content of the file as binary text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string result user should check whether error happened.
     */
    asBinaryString:{
        value:function(fileName,callback){
            fs.util.readAsBinaryString(fileName,callback,{});
        }
    },
    /**
     * Method reads content of the temporary file as binary text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string result user should check whether error happened.
     */
    tmpFileAsBinaryString:{
        value:function(fileName,callback){
            fs.util.readAsBinaryString(fileName,callback,{tmp:true});
        }
    },
    /**
     * Method reads content of the file as array buffer.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and  array buffer.
     * Before using array buffer user should check whether error happened.
     */
    asArrayBuffer:{
        value:function(fileName,callback){
            fs.util.readAsArrayBuffer(fileName,callback,{});
        }
    },
    /**
     * Method reads content of the temporary file as array buffer.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and array buffer.
     * Before using array buffer user should check whether error happened.
     */
    tmpFileAsArrayBuffer:{
        value:function(fileName,callback){
            fs.util.readAsArrayBuffer(fileName,callback,{tmp:true});
        }
    },
    /**
     * Method reads content of the file as plain text.
     * @param file - file object.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    fileAsText:{
        value:function(file,callback){
            fs.util.getReader(file,callback,'readAsText');
        }
    },
    /**
     * Method reads content of the file as dataURL.
     * @param file - file object.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using datURL user should check whether error happened.
     */
    fileAsDataURL:{
        value:function(file,callback){
            fs.util.getReader(file,callback,'readAsDataURL');
        }
    },
    /**
     * Method reads content of the file as array buffer.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and array buffer.
     * Before using array buffer user should check whether error happened.
     */
    fileAsArrayBuffer:{
        value:function(file,callback){
            fs.util.readFileAsArrayBuffer(file,callback);
        }
    },
     /**
     * Method reads content of the file as binary string.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string user should check whether error happened.
     */
    fileAsBinaryString:{
        value:function(file,callback){
            fs.util.readFileAsBinaryString(file,callback);
        }
    }
});

// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
fs.write = Object.create({},{
    /**
     * Method for file object to file in the filesystem.
     *
     * @param file - file to be saved on the filesystem.
     * @param callback - callback with error parameter if something went wrong.
     * @param fileName - name of the file.
     */
    file:{
        value:function(file,callback,filename){
            fs.util.writeFileToFile(file,callback,{filename:filename});
        }
    },
    /**
     * Method for file object to file in the filesystem.
     *
     * @param file - file to be saved on the filesystem.
     * @param callback - callback with error parameter if something went wrong.
     * @param fileName - name of the file.
     */
    fileToTmpFile:{
        value:function(file,callback,filename){
            fs.util.writeFileToFile(file,callback,{tmp:true,filename:filename});
        }
    },
    /**
     * Method for writing blob to file.
     *
     * @param fileName - filename in which data should be written. File will be created.
     * @param blob - content of the file.
     * @param callback - callback after execution may contain only one parameter: error.
     */
    blob:{
        value:function(fileName,blob,callback){
            fs.util.writeBlobToFile(fileName,blob,callback,{});
        }
    },
    /**
     * Method for writing blob to temp file.
     *
     * @param fileName - filename in which data should be written. File will be created.
     * @param blob - content of the file.
     * @param callback - callback after execution may contain only one parameter: error.
     */
    blobToTmpFile:{
        value:function(fileName,blob,callback){
            fs.util.writeBlobToFile(fileName,blob,callback,{tmp:true});
        }
    },
    /**
     * Method for writing text to the file.
     *
     * @param fileName - name of the file. File will be created.
     * @param text - text (multi line using \r\n) that should be written.
     * @param callback - callback with error parameter if something went wrong.
     */
    text:{
        value:function(fileName,text,callback){
            fs.util.writeTextToFile(fileName,text,callback,{});
        }
    },
    /**
     * Method for writing text to the temporary file.
     *
     * @param fileName - name of the file. File will be created.
     * @param text - text (multi line using \r\n) that should be written.
     * @param callback - callback with error parameter if something went wrong.
     */
    textToTmpFile: {
        value:function(fileName,text,callback){
            fs.util.writeTextToFile(fileName,text,callback,{tmp:true});
        }
    },
    /**
     * Method for writing base64 encoded string to file.
     *
     * @param fileName - name of the file. File will be created.
     * @param content - encoded string.
     * @param contentType - content type.
     * @param callback - callback with error parameter if something went wrong.
     */
    base64Str:{
        value:function(fileName,content,contentType,callback){
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{});
        }
    },
     /**
     * Method for writing base64 encoded string to temp file.
     *
     * @param fileName - name of the file. File will be created.
     * @param content - encoded string.
     * @param contentType - content type.
     * @param callback - callback with error parameter if something went wrong.
     */
    base64StrToTmpFile:{
        value:function(fileName,content,contentType,callback){
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{tmp:true});
        }
    }
});

