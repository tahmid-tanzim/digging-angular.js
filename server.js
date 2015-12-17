var express = require('express');

var server = express();
server.use(express.static(__dirname + '/'));

var port = 8080;
server.listen(port, function() {
    console.log("Server listening on 'http://localhost:" + port + "'");
    console.log("Press Ctrl+C to Exit.");
});