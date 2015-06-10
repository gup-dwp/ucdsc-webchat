// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");          // EasyRTC external module
var argv    = require('minimist')(process.argv.slice(2));


// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/dist/public/"));

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);
// start grunt
gruntfile = (argv.ruby) ? __dirname + '/Gruntfile_ruby_sass.js' : __dirname + '/Gruntfile.js';
require(__dirname + '/node_modules/grunt/lib/grunt.js').cli({
  'gruntfile' : gruntfile
});
