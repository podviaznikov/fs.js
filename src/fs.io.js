/* 
 * (c) 2011 Enginimation Studio (http://enginimation.com).
 * fs.js may be freely distributed under the MIT license.
 */ 
"use strict";
//Define io module for dealing with FileSystem
fs.io = Object.create({},{
    // Files
    // -----------------
    // Create file.
    createFile:{
        value:function(fileName,callback){
            fs.io.getFileFromRoot(fileName,callback,{});
        }
    },
    // Create temporary file.
    createTmpFile:{
        value:function(fileName,callback){
            fs.io.getFileFromRoot(fileName,callback,{tmp:true});
        }
    },
    // Get file.
    getFile:{
        value:function(directory,fileName,callback){
            //success
            directory.getFile(fileName,{create:false}, function(fileEntry){
                callback(undefined,fileEntry);
            },
            //error
            function(err){
                callback(err);
            });
        }
    },
    // Get or create file.
    getFileOrCreate:{
        value:function(directory,fileName,callback){
            directory.getFile(fileName,{create:true}, function(fileEntry){
                //success
                callback(undefined,fileEntry);
            },
            //error
            function(err){
                callback(err);
            });
        }
    },
    // Get file from root.
    getFileFromRoot:{
        value:function(fileName,callback,options){
            fs.getNativeFS(function(err,filesystem){
                if(err){
                    callback(err);
                }else{
                    fs.util.getFile(filesystem.root,fileName,callback);
                }
            },options);
        }
    },
    // Directories
    // -----------------
    // Create directory.
    createDirectory:{
        value:function(directoryName,callback){
            fs.io.getDirectoryFromRoot(directoryName,callback,{});
        }
    },
    // Create temporary directory.
    createTmpDirectory:{
        value:function(directoryName,callback){
            fs.io.getDirectoryFromRoot(directoryName,callback,{tmp:true});
        }
    },
    // Read directory.
    readDirectory:{
        value:function(directoryName,callback){
            fs.util.getDirectory(directoryName,function(err,directory){
                //error
                if(err){
                    callback(err);
                }
                //success
                else{
                    fs.util.readEntriesFromDirectory(directory,callback);
                }
            },{});
        }
    },
    // Read root directory
    readRootDirectory:{
        value:function(callback){
            fs.getNativeFS(function(err,filesystem){
                //error
                if(err){
                    callback(err);
                }
                //success
                else{
                    fs.util.readEntriesFromDirectory(filesystem.root,callback);
                }
            },{});
        }
    },
    // Get directory.
    getDirectory:{
        value:function(directory,directoryName,callback){
            callback(undefined,directory.getDirectory(directoryName,{create:true}));
        }
    },
    // Get root directory.
    getDirectoryFromRoot:{
        value:function(directoryName,callback,options){
            fs.getNativeFS(function(err,filesystem){
                //error
                if(err){
                    callback(err);
                }
                //success
                else{
                    fs.util.getDirectory(filesystem.root,directoryName,callback);
                }
            },options);
        }
    },
});

