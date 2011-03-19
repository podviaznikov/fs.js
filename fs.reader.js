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
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
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
     * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
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

