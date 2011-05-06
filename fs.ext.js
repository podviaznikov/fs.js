// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
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
 * Method for getting size of the file in KB.
 *
 * @return size of the file in KB.
 */
Object.defineProperty(File.prototype,
'sizeInKB',
{
    value:function()
    {
        var size = this.size;
        return (size/(1014)).toFixed(1);
    }
});
/**
 * Method for getting size of the file in MB.
 *
 * @return size of the file in MB.
 */
Object.defineProperty(File.prototype,
'sizeInMB',
{
    value:function()
    {
        var size = this.size;
        return (size/(1024*1014)).toFixed(1);
    }
});
/**
 * Method for getting size of the file in GB.
 *
 * @return size of the file in GB.
 */
Object.defineProperty(File.prototype,
'sizeInGB',
{
    value:function()
    {
        var size = this.size;
        return (size/(1024*1014*1024)).toFixed(1);
    }
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
            case fs.FILE_EXPECTED:
              msg = 'FILE_EXPECTED';
              break;
            case fs.BROWSER_NOT_SUPPORTED:
              msg = 'BROWSER_NOT_SUPPORTED';
              break;
            default:
              msg = 'Unknown Error';
              break;
        };
        return msg;
    }
});
