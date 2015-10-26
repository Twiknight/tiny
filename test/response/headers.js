'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');
const urlParse = require('url').parse;

describe('response.headers', function(){

    let req = httpMocks.createRequest({
        method: 'PUT',
        url: '/user/tobi',
        headers:{
            host:'localhost:3000',
            accept:'*/*'
        }
    });
    let request = new Request(req);

    it('should throw TypeError if not set to Objects', function (done) {
        let res = new Response(request, httpMocks.createResponse());
        expect(function(){
            res.headers = 'headers';
        }).to.throw('Response.headers should only be set to objects but got string.');
        done();
    });

    it('should be correctly set and got', function(done){
        let res = new Response(request, httpMocks.createResponse());
        let _headers = {
            'Content-Type': 'text/html'
        };
        res.headers = _headers;
        expect(res.headers).to.equal(_headers);
        done();
    });
});
