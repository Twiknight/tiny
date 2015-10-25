'use strict'

const Tiny = require('.././lib/app');

let myServer = new Tiny();
myServer.register(function(req,res){
    console.log(`request accept from: ${req.connection.remoteAddress}`);
    res.write("200 ok\n");
    res.end("hello");
})

myServer.listen(3000);
