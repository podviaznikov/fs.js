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
var fs=Object.create({},
{
    /**
     * Version of the lib
     */
    version:{value:'0.8.4'},
    /**
     * Configuration property. Indicates whether to use logging.
     * Default value is <code>false</code> but can be changed.
     */
    log:{value:false,writable:true},
    /**
     * Configuration property. Specifies the size of preserved space in file system.
     * Default value is 5 GB but can be changed.
     */
    maxSize:{value:5*1020*1024*1024,writable:true},
    /**
     * Define custom error code. This error code used when file is expected but
     * folder was gotten.
     *
     * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
     */
    FILE_EXPECTED:{value:6},
    /**
     * Define custom error code. This error code used when browser doesn't support
     * one of the requested features.
     *
     * @see http://www.w3.org/TR/FileAPI/#dfn-fileerror
     */
    BROWSER_NOT_SUPPORTED:{value:7},

    /**
     * Get reference to the FileSystem.
     * @param callback with: error or FileSystem object
     * @param options: tmp option identifies that temporary FileSystem should be obtained.
     */
    getNativeFS:
    {
        value:function(callback,options)
        {
            if (global.requestFileSystem)
            {
                var scope = global.PERSISTENT;
                if(options && options.tmp)
                {
                    scope = global.TEMPORARY;
                }
                global.requestFileSystem(scope, this.maxSize, function(fs)
                {
                    callback(undefined,fs);
                },
                /* error callback*/
                function(err)
                {
                    callback(err);
                });
            }
            else
            {
                callback(fs.BROWSER_NOT_SUPPORTED);
            }
        }
    },
    /**
     * Create blob for given content and content/type.
     *
     * @return blob.
     */
    createBlob:
    {
        value:function(content,contentType)
        {
            var blobBuilder = new BlobBuilder();
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
    base64StringToBlob:
    {
        value:function(base64String,type)
        {
            var decodedString  = atob(base64String);
            var dataLength = decodedString .length;
            var arrayData = new Int8Array(dataLength);
            for(var i = 0; i < dataLength; i++)
            {
                arrayData[i] = decodedString .charCodeAt(i)
            }
            return this.createBlob(arrayData.buffer,type);
        }
    }
}
);
