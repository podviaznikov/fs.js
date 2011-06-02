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
