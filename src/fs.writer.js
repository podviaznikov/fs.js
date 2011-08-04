// Module for writing operations with FileSystem, API is stable.
fs.write = Object.create({},{
    // Write file instance to FileSystem with provided filename.
    file:{
        value:function(file,callback,filename){
            fs.util.writeFileToFile(file,callback,{filename:filename});
        }
    },
    // Write file instance as temporary file to FileSystem with provided filename.
    fileToTmpFile:{
        value:function(file,callback,filename){
            fs.util.writeFileToFile(file,callback,{tmp:true,filename:filename});
        }
    },
    // Write blob to FileSystem with provided name.
    blob:{
        value:function(fileName,blob,callback){
            fs.util.writeBlobToFile(fileName,blob,callback,{});
        }
    },
    // Write blob as temporary file to FileSystem with provided name.
    blobToTmpFile:{
        value:function(fileName,blob,callback){
            fs.util.writeBlobToFile(fileName,blob,callback,{tmp:true});
        }
    },
    // Write text to FileSystem with provided name.
    text:{
        value:function(fileName,text,callback){
            fs.util.writeTextToFile(fileName,text,callback,{});
        }
    },
    // Write text as temporary file to FileSystem with provided name.
    textToTmpFile: {
        value:function(fileName,text,callback){
            fs.util.writeTextToFile(fileName,text,callback,{tmp:true});
        }
    },
    // Write base64 string to FileSystem with provided name.
    base64Str:{
        value:function(fileName,content,contentType,callback){
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{});
        }
    },
    // Write base64 string as temporary file to FileSystem with provided name.
    base64StrToTmpFile:{
        value:function(fileName,content,contentType,callback){
            fs.util.writeBase64StrToFile(fileName,content,contentType,callback,{tmp:true});
        }
    }
});