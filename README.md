# fs.js - FileSystem JavaScript wrapper
fs.js - is simple wrapper for dealing with HTML(5) File API (http://dev.w3.org/2006/webapi/FileAPI/) and filesystem itself.
Idea of the project is to simplify standard API. There is no aim to support this in all versions of all browsers.
Current version of library is 0.9. Version indicates approximate amount of original API covered. 1.0 would mean that all
methods are supported.

## Rules
Basically most of the method from the public API follow this rule:
last parameter of the method should be callback. Callback has two parameters:
	error - if error is not undefined something wrong has gone. Error code can be retrieved
	success - if there were no error you can use method result. Depending on the method it can be file content, file list etc.

## Files

 - fs.core.js - core library file. Namespace is fs.
 - fs.util.js - low level method are in this file. Namespace is fs.util.
 - fs.io.js - basic API for dealing with files and directories. Namespace is fs.io.
 - fs.reader.js - basic API for reading files. Namespace is fs.read.
 - fs.writer.js - basic API for writing to files. Namespace is fs.write.
 - index.html - page used for tests.
 - manifest.json - manifest file for the Chrome Web App.
 - test_data - some files that can be used for tests.

To test it's functionality you can checkout whole project. Install it as Google Chrome packaged application.
After application create just put test files from test_data folder into the file system folder for your application.

## Read files
    fs.read.fileAsText('test.txt',function(err,data){...}
    fs.read.fileAsDataUrl('test.zip',function(err,data){...}
    fs.read.fileAsBinaryString('test.txt',function(err,data){...}
    fs.read.fileAsArrayBuffer('test.txt',function(err,data){...}

## Write files
    fs.write.text('new_file_with_text.txt','Line1\r\nLine2',function(err,data){...});

    var content='UEsDBBQAAAAIAJp9Pj7t9B2+DQAAAA4AAAAIAAAAdGVzdC50eHTzycxLVTDk5fIB0UYAUEsBAhQAFAAAAAgAmn0+Pu30Hb4NAAAADgAAAAgAAAAAAAAAAQAgAAAAAAAAAHRlc3QudHh0UEsFBgAAAAABAAEANgAAADMAAAAAAA==';
    fs.write.base64Str('base64.zip',content,'application/zip',function(err,data){...});

## Temporary files
Discussed read/write operations are used for persistent files. Almost same API works (method parameters are the same)
for temporary files. E.x.:

    fs.read.tmpFileAsText(fileName,callback){...}
    fs.read.tmpFileAsBinaryString(fileName,callback){...}
    fs.read.tmpFileAsDataUrl(fileName,callback){...}
    fs.read.tmpFileAsArrayBuffer(fileName,callback){...}
    fs.write.file:function(file,callback,filename){...}
    fs.write.blob(fileName,blob,callback){...}
    fs.write.text(fileName,text,callback){...}
    fs.write.base64Str(fileName,str,callback){...}

## Directories
     fs.io.createDirectory(directoryName,function(er,directory)){...}
     fs.io.readRootDirectory(function(er,entries)){...}
     fs.io.readDirectory(directoryName,function(er,entries)){...}

## Additions
Beside common IO operations with filesystem special module with some utilities was developed.

Native File object was extended with:

 - shortName() - method for getting name of teh file without extension.
 - extension() - method for getting extension of the file
 - sizeInKB() - method for getting size of the file in the kilobytes.
 - sizeInMB() - method for getting size of the file in the megabytes.
 - sizeInGB() - method for getting size of the file in the gigabytes.

To use this functionality please include fs.ext.js.

## To come
 - add method for deleting files/moving
 - add method for renaming files
 - add operation to support directories
 - your suggestions?

## Feedback
I would like to here any feedback from you. If you miss some functionality or have questions how this stuff can be used
you are welcome to write me on anton.podviaznikov@enginimation.com. I like emails!

## License

(The MIT License)

Copyright (c) 2011 Anton Podviaznikov <anton.podviaznikov@enginimation.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
