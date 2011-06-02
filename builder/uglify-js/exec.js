// readFile("tmp.js")
load(arguments[0]);
print("/*" + arguments[2] + "*/" + Uglify.uglify(readFile(arguments[1])))