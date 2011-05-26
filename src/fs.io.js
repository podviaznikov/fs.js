// (c) 2011 Enginimation Studio (http://enginimation.com).
// fs.js may be freely distributed under the MIT license.
"use strict";
fs.io = Object.create({},{
    /* Files and Directories*/
    createFile:{
        value:function(fileName,callback){
            fs.util.getFileFromRoot(fileName,callback,{});
        }
    },
    createTmpFile:{
        value:function(fileName,callback){
            fs.util.getFileFromRoot(fileName,callback,{tmp:true});
        }
    },
    createDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectoryFromRoot(directoryName,callback,{});
        }
    },
    createTmpDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectoryFromRoot(directoryName,callback,{tmp:true});
        }
    },

    /*Directories*/
    readDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectory(directoryName,function(err,directory){
                if(err){//error
                    callback(err);
                }else{//success
                    fs.util.readEntriesFromDirectory(directory,callback);
                }
            },{});
        }
    },
    readRootDirectory:{
        value:function(callback){
            fs.getNativeFS(function(err,filesystem){
                if(err){//error
                    callback(err);
                }else{//success
                    fs.util.readEntriesFromDirectory(filesystem.root,callback);
                }
            },{});
        }
    }
});

