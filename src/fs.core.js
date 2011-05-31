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
                arrayData[i] = decodedString.charCodeAt(i);
            }
            return this.createBlob(arrayData.buffer,type);
        }
    }
});
