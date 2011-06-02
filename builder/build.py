# JSBuilder example

# project name (from the root folder)
copyright = '(c) 2011 Enginimation Studio (http://enginimation.com). may be freely distributed under the MIT license.'
max_js = 'build/fs.js.js'
min_js = 'build/fs.js.min.js'

# file list (from the root/src folder)
files = [
    "fs.core.js",     #core module
    "fs.ext.js",      #extensions
    "fs.io.js",       #io module
    "fs.util.js",     #common utils
    "fs.reader.js",   #read API
    "fs.writer.js"    #write API
]

# execute the task
import JSBuilder
JSBuilder.compile(
    copyright,
    max_js,
    min_js,
    files
)

# let me read the result ...
import time
time.sleep(2)