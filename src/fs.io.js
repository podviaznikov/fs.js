"use strict";
//Define io module for dealing with FileSystem
fs.io = Object.create({},{
    // Files
    // -----------------
    // Get file (or create if doesn't exists).
    getFile:{
        value:function(directory,fileName,callback){
            //success
            directory.getFile(fileName,{create:true}, function(fileEntry){
                callback(undefined,fileEntry);
            },
            //error
            function(err){
                callback(err);
            });
        }
    },
    // Get file from root (or create if doesn't exists).
    getFileFromRoot:{
        value:function(fileName,callback,options){
            fs.getNativeFS(function(err,filesystem){
                if(err){
                    callback(err);
                }else{
                    fs.io.getFile(filesystem.root,fileName,callback);
                }
            },options);
        }
    },
    // Directories
    // -----------------
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
    // Get directory (or create if doesn't exists).
    getDirectory:{
        value:function(directory,directoryName,callback){
            callback(undefined,directory.getDirectory(directoryName,{create:true}));
        }
    },
    // Get root directory (or create if doesn't exists).
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

