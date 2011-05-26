FsCoreTest = TestCase("fsCoreTest");

FsCoreTest.prototype.testVersion = function() {
  assertEquals("0.9", fs.version);
  jstestdriver.console.log("fs.js version is", fs.version);
};