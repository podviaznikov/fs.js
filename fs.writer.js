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
fs.write = Object.create({},
{
    /**
     * Method for file object to file in the filesystem.
     *
     * @param file - file to be saved on the filesystem.
     * @param callback - callback with error parameter if something went wrong.
     * @param fileName - name of the file.
     */
    file:
    {
        value:function(file,callback,filename)
        {
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
    fileToTmpFile:
    {
        value:function(file,callback,filename)
        {
            fs.util.writeFileToFile(file,callback,{tmp:true});
        }
    },

    /**
     * Method for writing blob to file.
     *
     * @param fileName - filename in which data should be written. File will be created.
     * @param blob - content of the file.
     * @param callback - callback after execution may contain only one parameter: error.
     */
    blob:
    {
        value:function(fileName,blob,callback)
        {
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
    blobToTmpFile:
    {
        value:function(fileName,blob,callback)
        {
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
    text:
    {
        value:function(fileName,text,callback)
        {
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
    textToTmpFile:
    {
        value:function(fileName,text,callback)
        {
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
    base64Str:
    {
        value:function(fileName,content,contentType,callback)
        {
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
    base64StrToTmpFile:
    {
        value:function(fileName,content,contentType,callback)
        {
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{tmp:true});
        }
    }
});

