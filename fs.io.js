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
fs.io = (function()
{
    return {

        /* READING FILES*/

        /**
         * Method reads content of the file as dataURL.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using dataURL user should check whether error happened.
         */
        readAsDataUrl:function(fileName,callback)
        {
            fs.util.readAsDataUrl(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as dataURL.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using dataURL user should check whether error happened.
         */
        readTmpFileAsDataUrl:function(fileName,callback)
        {
            fs.util.readAsDataUrl(fileName,callback,{tmp:true});
        },

        /**
         * Method reads content of the file as plain text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and text.
         * Before using text user should check whether error happened.
         */
        readAsText:function(fileName,callback)
        {
            fs.util.readAsText(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as plain text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and text.
         * Before using text user should check whether error happened.
         */
        readTmpFileAsText:function(fileName,callback)
        {
            fs.util.readAsText(fileName,callback,{tmp:true});
        },

        /**
         * Method reads content of the file as binary text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
         * Before using binary string result user should check whether error happened.
         */
        readAsBinaryString:function(fileName,callback)
        {
            fs.util.readAsBinaryString(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as binary text.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and binary string.
         * Before using binary string result user should check whether error happened.
         */
        readTmpFileAsBinaryString:function(fileName,callback)
        {
            fs.util.readAsBinaryString(fileName,callback,{tmp:true});
        },

        /**
         * Method reads content of the file as array buffer.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using array buffer user should check whether error happened.
         */
        readAsArrayBuffer:function(fileName,callback)
        {
            fs.util.readAsArrayBuffer(fileName,callback,{});
        },

        /**
         * Method reads content of the temporary file as array buffer.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using array buffer user should check whether error happened.
         */
        readTmpFileAsArrayBuffer:function(fileName,callback)
        {
            fs.util.readAsArrayBuffer(fileName,callback,{tmp:true});
        },


        /**
         * Method reads content of the file as plain text.
         * @param file - file object.
         * @param callback - callback after operation is done. Has 2 parameters: error and text.
         * Before using text user should check whether error happened.
         */
        readFileAsText:function(file,callback)
        {
            fs.util.getReader(file,callback,function(reader,theFile)
            {
                reader.readAsText(theFile);
            });
        },

        /**
         * Method reads content of the file as dataURL.
         * @param file - file object.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using datURL user should check whether error happened.
         */
        readFileAsDataURL:function(file,callback)
        {
            fs.util.getReader(file,callback,function(reader,theFile)
            {
                reader.readAsDataURL(theFile);
            });
        },

        /**
         * Method reads content of the file as array buffer.
         * @param fileName - name of the file in the file system.
         * @param callback - callback after operation is done. Has 2 parameters: error and dataURL.
         * Before using array buffer user should check whether error happened.
         */
        readFileAsArrayBuffer:function(file,callback)
        {
            fs.util.readFileAsArrayBuffer(file,callback);
        },

        /* Files and Directories*/

        createFile:function(fileName,callback)
        {
            fs.util.createFile(fileName,callback,{});
        },
        createTmpFile:function(fileName,callback)
        {
            fs.util.createFile(fileName,callback,{tmp:true});
        },

        createDirectory:function(directoryName,callback)
        {
            fs.util.createDirectory(directoryName,callback,{});
        },

        createTmpDirectory:function(directoryName,callback)
        {
            fs.util.createDirectory(directoryName,callback,{tmp:true});
        },

        /* WRITING DATA*/
        writeFileToFile:function(file,callback)
        {
            fs.util.writeFileToFile(file,callback,{});
        },

        writeFileToTmpFile:function(file,callback)
        {
            fs.util.writeFileToFile(file,callback,{tmp:true});
        },

        /**
         * Method for writing blob to file.
         *
         * @param fileName - filename in which data should be written. File will be created.
         * @param blob - content of the file.
         * @param callback - callback after execution may contain only one parameter: error.
         */
        writeBlobToFile:function(fileName,blob,callback)
        {
            fs.util.writeBlobToFile(fileName,blob,callback,{});
        },

        /**
         * Method for writing blob to temp file.
         *
         * @param fileName - filename in which data should be written. File will be created.
         * @param blob - content of the file.
         * @param callback - callback after execution may contain only one parameter: error.
         */
        writeBlobToTmpFile:function(fileName,blob,callback)
        {
            fs.util.writeBlobToFile(fileName,blob,callback,{tmp:true});
        },

        /**
         * Method for writing text to the file.
         *
         * @param fileName - name of the file. File will be created.
         * @param text - text (multi line using \r\n) that should be written.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeTextToFile:function(fileName,text,callback)
        {
            fs.util.writeTextToFile(fileName,text,callback,{});
        },

        /**
         * Method for writing text to the temporary file.
         *
         * @param fileName - name of the file. File will be created.
         * @param text - text (multi line using \r\n) that should be written.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeTextToTmpFile:function(fileName,text,callback)
        {
            fs.util.writeTextToFile(fileName,text,callback,{tmp:true});
        },

        /**
         * Method for writing base64 encoded string to file.
         *
         * @param fileName - name of the file. File will be created.
         * @param content - encoded string.
         * @param contentType - content type.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeBase64StrToFile:function(fileName,content,contentType,callback)
        {
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{});
        },

         /**
         * Method for writing base64 encoded string to temp file.
         *
         * @param fileName - name of the file. File will be created.
         * @param content - encoded string.
         * @param contentType - content type.
         * @param callback - callback with error parameter if something went wrong.
         */
        writeBase64StrToTmpFile:function(fileName,content,contentType,callback)
        {
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{tmp:true});
        },

        /*Directories*/
        readDirectory:function(directoryName,callback)
        {
            fs.util.getDirectory(directoryName,function(err,directory)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    fs.util.readEntriesFromDirectory(directory,callback);
                }
            },{});
        },

        readRootDirectory:function(callback)
        {
            fs.getNativeFS(function(err,filesystem)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    fs.util.readEntriesFromDirectory(filesystem.root,callback);
                }
            },{});
        }
    };
})();

