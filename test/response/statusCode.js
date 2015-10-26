'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');
const urlParse = require('url').parse;

describe('response.statusCode', function(){

    let req = httpMocks.createRequest({
        method: 'PUT',
        url: '/user/tobi',
        headers:{
            host:'localhost:3000',
            accept:'*/*'
        }
    });
    let request = new Request(req);

    it('should throw TypeError if not set to Number', function (done) {
        let res = new Response(request, httpMocks.createResponse());
        expect(function(){
            res.statusCode = 'code';
        }).to.throw('status code should be set to a number but got string.');
        done();
    });

    it('should throw TypeError if set to Float', function (done) {
        let res = new Response(request, httpMocks.createResponse());
        expect(function(){
            res.statusCode = 3.14;
        }).to.throw('status code should be int.');
        done();
    });

    it('should be correctly set and got', function(done){
        let res = new Response(request, httpMocks.createResponse());
        let _headers = {
            'Content-Type': 'text/html'
        };
        res.statusCode = 404.0;
        expect(res.statusCode).to.equal(404);
        done();
    });
});
