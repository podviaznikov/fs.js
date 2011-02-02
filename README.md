# fs.js - FileSystem JavaScript wrapper
fs.js - is simple wrapper for dealing with HTML(5) File API (http://dev.w3.org/2006/webapi/FileAPI/) and filesystem itself.
Idea of the project is to simplify standard API. There is no aim to support this in all versions of all browsers.
Current version of library is 0.5. Version indicates approximate amount of original API covered. 1.0 would mean that all
methods are supported.

## Files

 - fs.js - is the library file itself.
 - index.html - page used for tests.
 - manifest.json - manifest file for the Chrome Web Store Web App.
 - test_data - some files that can be used for tests.

To test it's functionality you can checkout whole project. Install it as Google Chrome packaged application.
After application create just put test files from test_data folder into the file system folder for your application.

## Read files
    fs.readAsText('test.txt',function(err,data){...}
    fs.readAsDataURL('test.zip',function(err,data){...}
    fs.readAsBinaryString('test.txt',function(err,data){...}
    fs.readAsArrayBuffer('test.txt',function(err,data){...}

## Write files
    fs.writeText('new_file_with_text.txt','Line1\r\nLine2',function(err,data){...}

    var content='UEsDBBQAAAAIAJp9Pj7t9B2+DQAAAA4AAAAIAAAAdGVzdC50eHTzycxLVTDk5fIB0UYAUEsBAhQAFAAAAAgAmn0+Pu30Hb4NAAAADgAAAAgAAAAAAAAAAQAgAAAAAAAAAHRlc3QudHh0UEsFBgAAAAABAAEANgAAADMAAAAAAA==';
    fs.writeDataURL('base64.zip',content,'application/zip',function(err,data){...}

## To come
 - add method for dealing with temporary files
 - add method for deleting files/moving
 - add method for renaming files
 - add operation to support directories

## License

(The MIT License)

Copyright (c) 2011 Anton Podviaznikov <podviaznikov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.