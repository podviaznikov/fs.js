// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
fs.read = Object.create({},
{
    /**
     * Method reads content of the file as dataURL.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using dataURL user should check whether error happened.
     */
    asDataUrl:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsDataUrl(fileName,callback,{});
        }
    },

    /**
     * Method reads content of the temporary file as dataURL.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using dataURL user should check whether error happened.
     */
    tmpFileAsDataUrl:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsDataUrl(fileName,callback,{tmp:true});
        }
    },

    /**
     * Method reads content of the file as plain text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    asText:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsText(fileName,callback,{});
        }
    },

    /**
     * Method reads content of the temporary file as plain text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    tmpFileAsText:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsText(fileName,callback,{tmp:true});
        }
    },

    /**
     * Method reads content of the file as binary text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string result user should check whether error happened.
     */
    asBinaryString:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsBinaryString(fileName,callback,{});
        }
    },

    /**
     * Method reads content of the temporary file as binary text.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string result user should check whether error happened.
     */
    tmpFileAsBinaryString:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsBinaryString(fileName,callback,{tmp:true});
        }
    },

    /**
     * Method reads content of the file as array buffer.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and  array buffer.
     * Before using array buffer user should check whether error happened.
     */
    asArrayBuffer:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsArrayBuffer(fileName,callback,{});
        }
    },

    /**
     * Method reads content of the temporary file as array buffer.
     * @param fileName - name of the file in the file system.
     * @param callback - callback after operation is done. Has 2 parameters: error and array buffer.
     * Before using array buffer user should check whether error happened.
     */
    tmpFileAsArrayBuffer:
    {
        value:function(fileName,callback)
        {
            fs.util.readAsArrayBuffer(fileName,callback,{tmp:true});
        }
    },


    /**
     * Method reads content of the file as plain text.
     * @param file - file object.
     * @param callback - callback after operation is done. Has 2 parameters: error and text.
     * Before using text user should check whether error happened.
     */
    fileAsText:
    {
        value:function(file,callback)
        {
            fs.util.getReader(file,callback,'readAsText');
        }
    },

    /**
     * Method reads content of the file as dataURL.
     * @param file - file object.
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
     * Before using datURL user should check whether error happened.
     */
    fileAsDataURL:
    {
        value:function(file,callback)
        {
            fs.util.getReader(file,callback,'readAsDataURL');
        }
    },

    /**
     * Method reads content of the file as array buffer.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and array buffer.
     * Before using array buffer user should check whether error happened.
     */
    fileAsArrayBuffer:
    {
        value:function(file,callback)
        {
            fs.util.readFileAsArrayBuffer(file,callback);
        }
    },

     /**
     * Method reads content of the file as binary string.
     * @param file - file to be read.
     * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
     * Before using binary string user should check whether error happened.
     */
    fileAsBinaryString:
    {
        value:function(file,callback)
        {
            fs.util.readFileAsBinaryString(file,callback);
        }
    }
});

