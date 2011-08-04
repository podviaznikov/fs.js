//  Utils module to deal with FileSystem. Some low-level methods.
fs.util= Object.create({},{
    // Read utils
    // -----------------
    // Create reader for the file using file name.
     getReaderUsingFileName:{
        value:function(fileName,callback,readerMethod,options){
            fs.io.getFileFromRoot(fileName,function(er,fileEntry){
                // Get a File object representing the file,
                // then use FileReader to read its contents.
                fileEntry.file(function(file){
                    fs.util.getReader(file,callback,readerMethod);
                },
                //error
                function(error){
                    callback(error);
                });
            },options);
        }
    },
    // Create reader for the file.
    getReader:{
        value:function(file,callback,readerMethod){
            //instantiate reader
            var reader = new global.FileReader(),
                initialFile = file;
            //register handler for `loadend` event.
            reader.onloadend = function(){
                //pass read data into the callback
                callback(undefined,this.result,initialFile);
            };
            //call one of the `FileReader`'s methods.
            reader[readerMethod](initialFile);
        }
    },
    // Read entries from directory
    readEntriesFromDirectory:{
        value:function(directory,callback){
            var directoryReader=directory.createReader();
            directoryReader.readEntries(function(entries){
                callback(undefined,entries);
            },
            function(error){
                callback(error);
            });
        }
    },
    // Read file as ArrayBuffer.
    readAsArrayBuffer:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsArrayBuffer',options);
        }
    },
    // Read file as ArrayBuffer.
    readFileAsArrayBuffer:{
        value:function(file,callback){
            this.getReader(file,callback,'readAsArrayBuffer');
        }
    },
    // Read file as binary string.
    readAsBinaryString:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsBinaryString',options);
        }
    },
    // Read file as binary string.
    readFileAsBinaryString:{
        value:function(file,callback){
            this.getReader(file,callback,'readAsBinaryString');
        }
    },
    // Read file as data url.
    readAsDataUrl:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsDataURL',options);
        }
    },
    // Read file as text.
    readAsText:{
        value:function(fileName,callback,options){
            this.getReaderUsingFileName(fileName,callback,'readAsText',options);
        }
    },
    // Remove file from FileSystem.
    remove:{
        value:function(filename,callback){
            fs.io.getFileFromRoot(filename,function(err,fileEntry){
                //success
                fileEntry.remove(function(){callback(undefined);},
                //error
                function(e){callback(e);});
            });
        }
    },
    // Write utils
    // -----------------
    // Write base64String to file.
    writeBase64StrToFile:{
        value:function(fileName,content,contentType,callback,options){
            // Create blob from base64 string.
            var blob = fs.base64StringToBlob(content,contentType);
            // Write blob to file.
            this.writeBlobToFile(fileName,blob,callback,options);
        }
    },
    // Write blob to file.
    writeBlobToFile:{
        value:function(fileName,blob,callback,options){
            // Get reference to file or create new one.
            fs.io.getFileFromRoot(fileName,function(err,fileEntry){
                if(err){
                    // Handle error with specified callback.
                    callback(err);
                }
                else{
                    // Create writer.
                    fileEntry.createWriter(function(fileWriter){
                        // Register handler for `writeend` event.
                        fileWriter.onwriteend = function(){
                            console.log('writing to file finished.');
                            // notify caller that blob was written to file
                            callback(undefined);
                        };
                        // Register handler for `error` event.
                        fileWriter.onerror = function(){
                            console.log('Error writing to file:'+this.error);
                            // notify caller about error
                            callback(this.error);
                        };
                        // write blob to file
                        fileWriter.write(blob);
                    },
                    // error during file writer creation
                    function(err){callback(err);});
                }
            },options);
        }
    },
    // Write text to file.
    writeTextToFile:{
        value:function(fileName,text,callback,options){
            var blob = fs.createBlob(text,'text/plain');
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },
    // Write ArrayBuffer to file.
    writeArrayBufferToFile:{
        value:function(fileName,contentType,arrayBuffer,callback,options){
            var blob = fs.createBlob(arrayBuffer,contentType);
            fs.util.writeBlobToFile(fileName,blob,callback,options);
        }
    },
    // Write file to file.
    writeFileToFile:{
        value:function(file,callback,options){
            // name of the file from options or from initial file.
            var filename = options.filename||file.name;
            // Get reference top file or create new.
            fs.io.getFileFromRoot(filename,function(err,fileEntry){
                if(err){
                    //
                    callback(err);
                }
                else{
                    fileEntry.createWriter(function(fileWriter){
                        // Register handler for `writeend` event.
                        fileWriter.onwriteend = function(){
                            console.log('writing to file finished.');
                            // notify caller that file was written to file
                            callback(undefined);
                        };
                        // Register handler for `error` event.
                        fileWriter.onerror = function(){
                            console.log('Error writing to file:'+this.error);
                            // notify caller about error
                            callback(this.error);
                        };
                        fileWriter.write(file);
                    },function(err){callback(err);});
                }
            },options);
        }
    },
   
    // URLs
    // -----------------
    // Create object URL.
    createObjectURL:{
        value:function(filename,callback){
            fs.io.getFileFromRoot(filename,function(er,fileEntry){
                if(er){
                    //notify caller about error
                    callback(er);
                }
                else{
                    fileEntry.file(function(file){
                        var url=global.URL.createObjectURL(file);
                        //notify caller about success.
                        callback(undefined,url);
                    });
                }
            });
        }
    },
    // Destroy object URL.
    destroyObjectURL:{
        value:function(url){global.URL.revokeObjectURL(url);}
    },
    // Get file URL
    getFileURL:{
        value:function(filename,callback){
            fs.io.getFileFromRoot(filename,function(er,fileEntry){
                if(er){
                    //notify caller about error
                    callback(er);
                }
                else{
                    var url=fileEntry.toURL();
                    //notify caller about success.
                    callback(undefined,url);
                }
            });
        }
    },
});