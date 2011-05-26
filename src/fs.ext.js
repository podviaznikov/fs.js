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
