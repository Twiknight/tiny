'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const http = require('http');

describe('response.send',function(){
    it('should send back response',function(done){
        let handler = function(req, res){
            let request = new Request(req);
            let response = new Response(request, res);
            response.statusCode = 200;
            response.body = new Buffer('hello');
            response.send();
        }
        let server = http.createServer(handler);
        server.listen(3000);

        http.get('http://localhost:3000',function (res) {
            expect(res.statusCode).to.equal(200);
            server.close();
            done();
        });
    });
});
