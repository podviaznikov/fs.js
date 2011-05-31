/* 
 * (c) 2011 Enginimation Studio (http://enginimation.com).
 * fs.js may be freely distributed under the MIT license.
 */ 
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