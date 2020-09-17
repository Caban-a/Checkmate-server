console.log("hello");
/*var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);*/

// example 1 : basic server on port 8080
/*var util = require("util");
var my_http = require("http");
my_http.createServer(function(request,response){
  util.puts("I got kicked");
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello World Yeah !");
  response.end();
}).listen(8080);
util.puts("Server Running on 8080");*/


// example 2 : path.exists does not exist
var util = require("util");
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");
my_http.createServer(function(request,response) {
	var my_path = url.parse(request.url).pathname;
	var full_path = path.join(process.cwd(), my_path);
	path.exists(full_path, function(exists) {
		if (!exists) {
			response.writeHeader(404, {"Content-Type": "text/plain"});  
			response.write("404 Not Found\n");  
			response.end();
		} else {
			filesys.readFile(full_path, "binary", function(err, file) {  
				if (err) {
					response.writeHeader(500, {"Content-Type": "text/plain"});  
					response.write(err + "\n");  
					response.end();  
				} else {
					response.writeHeader(200);  
					response.write(file, "binary");  
					response.end();
				}
			});
		}
	});
}).listen(8080);
util.puts("Server Running on 8080");


