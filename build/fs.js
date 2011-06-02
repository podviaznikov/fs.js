/**(c) 2011 Enginimation Studio (http://enginimation.com). may be freely distributed under the MIT license.*/
"use strict";
var global = this,fs;
// Fixing API method names
global.requestFileSystem = global.requestFileSystem || global.webkitRequestFileSystem;
global.BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder;
global.resolveLocalFileSystemURL = global.resolveLocalFileSystemURL || global.webkitResolveLocalFileSystemURL;
global.URL = global.URL || global.webkitURL;
//Creating entry point for the library.
fs=Object.create({},{
    // Current version of the library.
    version:{value:'0.9'},
    // Configuration property. Indicates whether to use logging.
    // Default value is `false` but can be changed.
    log:{value:false,writable:true},
    // Configuration property. Specifies the size of preserved space in file system.
    // Default value is `10 GB` but can be changed.
    maxSize:{value:10*1020*1024*1024,writable:true},
    // This error code used when file is expected but folder was gotten.
    // @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
    FILE_EXPECTED:{value:50},
    // This error code used when browser doesn't support one of the requested features.
    // @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
    BROWSER_NOT_SUPPORTED:{value:51},
    // Get reference to the FileSystem. Method has two parameters:
    //
    //     callback function with error or 'FileSystem' reference.
    //     optional options objects.
    getNativeFS:{
        value:function(callback,options){
            if (global.requestFileSystem){
                //default scope is PERSISTENT
                var scope = global.PERSISTENT;
                //create empty options object if not exists 
                options = options || {};
                //override scope to TEMPORARY if that was specified
                if(options.tmp){
                    scope = global.TEMPORARY;
                }
                //request FileSystem access for the provided scope and size
                global.requestFileSystem(scope, this.maxSize,function(fs){
                    //return FileSystem reference to the callback
                    callback(undefined,fs);
                },
                // error callback
                function(err){
                    callback(err);
                });
            }else{
                //browser not support and not expose FileSystem
                callback(fs.BROWSER_NOT_SUPPORTED);
            }
        }
    },
    // Create blob for given content and content/type.
    createBlob:{
        value:function(content,contentType){
            //creating new BlobBuilder instance
            var blobBuilder = new global.BlobBuilder();
            //setting content to blob builder
            blobBuilder.append(content);
            //getting blob from the blob builder
            return blobBuilder.getBlob(contentType);
        }
    },
    // Convert base64 string to blob. Parameters:
    //
    //     base64String - string that should be converted.
    //     type - content type for the blob.     
    base64StringToBlob:{
        value:function(base64String,type){
            //decode string
            var decodedString  = global.atob(base64String),
                dataLength = decodedString.length,
                arrayData = new global.Int8Array(dataLength),
                i = 0;
            for(; i < dataLength; i++){
                arrayData[i] = decodedString.charCodeAt(i);
            }
            return this.createBlob(arrayData.buffer,type);
        }
    }
});

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
 //todo check this http://dev.w3.org/2009/dap/file-system/file-writer.html!! and http://dev.w3.org/2009/dap/file-system/file-dir-sys.html#the-fileerror-interface
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

"use strict";
//Define io module for dealing with FileSystem
fs.io = Object.create({},{
    // Files
    // -----------------
    // Get file (or create if doesn't exists).
    getFile:{
        value:function(directory,fileName,callback){
            //success
            directory.getFile(fileName,{create:true}, function(fileEntry){
                callback(undefined,fileEntry);
            },
            //error
            function(err){
                callback(err);
            });
        }
    },
    // Get file from root (or create if doesn't exists).
    getFileFromRoot:{
        value:function(fileName,callback,options){
            fs.getNativeFS(function(err,filesystem){
                if(err){
                    callback(err);
                }else{
                    fs.io.getFile(filesystem.root,fileName,callback);
                }
            },options);
        }
    },
    // Directories
    // -----------------
    // Read directory.
    readDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectory(directoryName,function(err,directory){
                //error
                if(err){
                    callback(err);
                }
                //success
                else{
                    fs.util.readEntriesFromDirectory(directory,callback);
                }
            },{});
        }
    },
    // Read root directory
    readRootDirectory:{
        value:function(callback){
            fs.getNativeFS(function(err,filesystem){
                //error
                if(err){
                    callback(err);
                }
                //success
                else{
                    fs.util.readEntriesFromDirectory(filesystem.root,callback);
                }
            },{});
        }
    },
    // Get directory (or create if doesn't exists).
    getDirectory:{
        value:function(directory,directoryName,callback){
            callback(undefined,directory.getDirectory(directoryName,{create:true}));
        }
    },
    // Get root directory (or create if doesn't exists).
    getDirectoryFromRoot:{
        value:function(directoryName,callback,options){
            fs.getNativeFS(function(err,filesystem){
                //error
                if(err){
                    callback(err);
                }
                //success
                else{
                    fs.util.getDirectory(filesystem.root,directoryName,callback);
                }
            },options);
        }
    },
});


"use strict";
//  Utils module to deal with FileSystem. Some low-level methods.
fs.util= Object.create({},{
    // Read utils
    // -----------------
    // Create reader for the file using file name.
     getReaderUsingFileName:{
        value:function(fileName,callback,readerMethod,options)
        {
            fs.io.getFileFromRoot(fileName,function(er,fileEntry){
                // Get a File object representing the file,
                // then use FileReader to read its contents.
                fileEntry.file(function(file){
                    fs.util.getReader(file,callback,readerMethod);
                },
                //error
                function(error){
                    callback(error);
                });
            },options);
        }
    },
    // Create reader for the file.
    getReader:{
        value:function(file,callback,readerMethod){
            //instantiate reader
            var reader = new global.FileReader(),
                initialFile = file;
            //register handler for `loadend` event.
            reader.onloadend = function()
            {
                //pass read data into the callback
                callback(undefined,this.result,initialFile);
            };
            //call one of the `FileReader`'s methods.
            reader[readerMethod](initialFile);
        }
    },
    // Read entries from directory
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
    // Read file as ArrayBuffer.
    readAsArrayBuffer:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsArrayBuffer',options);
        }
    },
    // Read file as ArrayBuffer.
    readFileAsArrayBuffer:{
        value:function(file,callback){
            this.getReader(file,callback,'readAsArrayBuffer');
        }
    },
    // Read file as binary string.
    readAsBinaryString:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsBinaryString',options);
        }
    },
    // Read file as binary string.
    readFileAsBinaryString:{
        value:function(file,callback){
            this.getReader(file,callback,'readAsBinaryString');
        }
    },
    // Read file as data url.
    readAsDataUrl:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsDataURL',options);
        }
    },
    // Read file as text.
    readAsText:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsText',options);
        }
    },
    // Remove file from FileSystem.
    remove:{
        value:function(filename,callback){
            fs.io.getFileFromRoot(filename,function(err,fileEntry){
                //success
                fileEntry.remove(function(){callback(undefined);},
                //error
                function(e){callback(e);});
            });
        }
    },
    // Write utils
    // -----------------
    // Write base64String to file.
    writeBase64StrToFile:{
        value:function(fileName,content,contentType,callback,options){
            // Create blob from base64 string.
            var blob = fs.base64StringToBlob(content,contentType);
            // Write blob to file.
            this.writeBlobToFile(fileName,blob,callback,options);
        }
    },
    // Write blob to file.
    writeBlobToFile:{
        value:function(fileName,blob,callback,options){
            // Get reference to file or create new one.
            fs.io.getFileFromRoot(fileName,function(err,fileEntry){
                if(err){
                    // Handle error with specified callback.
                    callback(err);
                }else{
                    // Create writer.
                    fileEntry.createWriter(function(fileWriter){
                        // Register handler for `writeend` event.
                        fileWriter.onwriteend = function(){
                            console.log('writing to file finished.');
                            // notify caller that blob was written to file
                            callback(undefined);
                        };
                        // Register handler for `error` event.
                        fileWriter.onerror = function(){
                            console.log('Error writing to file:'+this.error);
                            // notify caller about error
                            callback(this.error);
                        };
                        // write blob to file
                        fileWriter.write(blob);
                    },
                    // error during file writer creation
                    function(err){callback(err);});
                }
            },options);
        }
    },
    // Write text to file.
    writeTextToFile:{
        value:function(fileName,text,callback,options){
            var blob = fs.createBlob(text,'text/plain');
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },
    // Write ArrayBuffer to file.
    writeArrayBufferToFile:{
        value:function(fileName,contentType,arrayBuffer,callback,options){
            var blob = fs.createBlob(arrayBuffer,contentType);
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },
    // Write file to file.
    writeFileToFile:{
        value:function(file,callback,options){
            // name of the file from options or from initial file.
            var filename = options.filename||file.name;
            // Get reference top file or create new.
            fs.io.getFileFromRoot(filename,function(err,fileEntry){
                if(err){
                    //
                    callback(err);
                }else{
                    fileEntry.createWriter(function(fileWriter){
                        // Register handler for `writeend` event.
                        fileWriter.onwriteend = function(){
                            console.log('writing to file finished.');
                            // notify caller that file was written to file
                            callback(undefined);
                        };
                        // Register handler for `error` event.
                        fileWriter.onerror = function(){
                            console.log('Error writing to file:'+this.error);
                            // notify caller about error
                            callback(this.error);
                        };
                        fileWriter.write(file);
                    },function(err){callback(err);});
                }
            },options);
        }
    },
   
    // URLs
    // -----------------
    // Create file URL.
    createFileURL:{
        value:function(filename,callback){
            fs.io.getFileFromRoot(filename,function(er,fileEntry){
                if(er){
                    //notify caller about error
                    callback(er);
                }else{
                    fileEntry.file(function(file){
                        var url=global.URL.createObjectURL(file);
                        //notify caller about success.
                        callback(undefined,url);
                    });
                }
            });
        }
    },
    // Destroy file URL.
    destroyFileURL:{
        value:function(url){global.URL.revokeObjectURL(url);}
    }

});

"use strict";
//Module for reading operations for FileSystem, API is stable.
fs.read = Object.create({},{
    // Read file as dataURL.
    asDataUrl:{
        value:function(fileName,callback){
            fs.util.readAsDataUrl(fileName,callback,{});
        }
    },
    // Read temporary file as dataURL.
    tmpFileAsDataUrl:{
        value:function(fileName,callback){
            fs.util.readAsDataUrl(fileName,callback,{tmp:true});
        }
    },
    // Read file as text.
    asText:{
        value:function(fileName,callback){
            fs.util.readAsText(fileName,callback,{});
        }
    },
    // Read temporary file as text.
    tmpFileAsText:{
        value:function(fileName,callback){
            fs.util.readAsText(fileName,callback,{tmp:true});
        }
    },
    // Read file as binary string.
    asBinaryString:{
        value:function(fileName,callback){
            fs.util.readAsBinaryString(fileName,callback,{});
        }
    },
    // Read temporary file as binary string.
    tmpFileAsBinaryString:{
        value:function(fileName,callback){
            fs.util.readAsBinaryString(fileName,callback,{tmp:true});
        }
    },
    // Read file as ArrayBuffer.
    asArrayBuffer:{
        value:function(fileName,callback){
            fs.util.readAsArrayBuffer(fileName,callback,{});
        }
    },
    // Read temporary file as ArrayBuffer.
    tmpFileAsArrayBuffer:{
        value:function(fileName,callback){
            fs.util.readAsArrayBuffer(fileName,callback,{tmp:true});
        }
    },
    // Read file instance as text.
    fileAsText:{
        value:function(file,callback){
            fs.util.getReader(file,callback,'readAsText');
        }
    },
    // Read file instance as dataUrl.
    fileAsDataUrl:{
        value:function(file,callback){
            fs.util.getReader(file,callback,'readAsDataURL');
        }
    },
    // Read file instance as ArrayBuffer.
    fileAsArrayBuffer:{
        value:function(file,callback){
            fs.util.readFileAsArrayBuffer(file,callback);
        }
    },
    // Read file instance as binary string.
    fileAsBinaryString:{
        value:function(file,callback){
            fs.util.readFileAsBinaryString(file,callback);
        }
    }
});
"use strict";
// Module for writing operations with FileSystem, API is stable.
fs.write = Object.create({},{
    // Write file instance to FileSystem with provided filename.
    file:{
        value:function(file,callback,filename){
            fs.util.writeFileToFile(file,callback,{filename:filename});
        }
    },
    // Write file instance as temporary file to FileSystem with provided filename.
    fileToTmpFile:{
        value:function(file,callback,filename){
            fs.util.writeFileToFile(file,callback,{tmp:true,filename:filename});
        }
    },
    // Write blob to FileSystem with provided name.
    blob:{
        value:function(fileName,blob,callback){
            fs.util.writeBlobToFile(fileName,blob,callback,{});
        }
    },
    // Write blob as temporary file to FileSystem with provided name.
    blobToTmpFile:{
        value:function(fileName,blob,callback){
            fs.util.writeBlobToFile(fileName,blob,callback,{tmp:true});
        }
    },
    // Write text to FileSystem with provided name.
    text:{
        value:function(fileName,text,callback){
            fs.util.writeTextToFile(fileName,text,callback,{});
        }
    },
    // Write text as temporary file to FileSystem with provided name.
    textToTmpFile: {
        value:function(fileName,text,callback){
            fs.util.writeTextToFile(fileName,text,callback,{tmp:true});
        }
    },
    // Write base64 string to FileSystem with provided name.
    base64Str:{
        value:function(fileName,content,contentType,callback){
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{});
        }
    },
    // Write base64 string as temporary file to FileSystem with provided name.
    base64StrToTmpFile:{
        value:function(fileName,content,contentType,callback){
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{tmp:true});
        }
    }
});

