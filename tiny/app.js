'use strict'
const http = require('http')

module.exports = function setup_server(port){
    let server  = http.createServer();

    server.on('request', function(req, res){
        console.log("request accept");
        console.log(req.connection.remoteAddress);
        res.write("200 ok\n");
        res.end("hello");
    });

    server.listen(port);
}
