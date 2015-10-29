'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');

describe('response.length', function(){
    let req = httpMocks.createRequest({
        method: 'PUT',
        url: '/user/tobi',
        headers:{
            host:'localhost:3000',
            accept:'*/*'
        }
    });
    let request = new Request(req);
    let response = httpMocks.createResponse();

    it("should throw if set to Non-number value", function(done){
        let res = new Response(request, response);
        function shouldThrow(){
            res.length = '100';
        };
        expect(shouldThrow).to.throw('response.length must be an Interger but got string.');
        done();
    });

    it("should throw if set to negetive number", function(done){
        let res = new Response(request, response);
        function shouldThrow(){
            res.length = -1;
        };
        expect(shouldThrow).to.throw('response.length must be a positive Interger but got -1.');
        done();
    });

    it("should throw if set to float", function(done){
        let res = new Response(request, response);
        function shouldThrow(){
            res.length = 1.5;
        };
        expect(shouldThrow).to.throw('response.length must be a positive Interger but got 1.5.');
        done();
    });

    it("should throw if set to 0", function(done){
        let res = new Response(request, response);
        function shouldThrow(){
            res.length = 0;
        };
        expect(shouldThrow).to.throw('response.length must be a positive Interger but got 0.');
        done();
    });

    it("should succeed if set to positive interger", function(done){
        let res = new Response(request, response);
        res.length = 100;
        expect(res.length).to.equal(100);
        done();
    });

    it("should calculate the length of body if body exists", function(done){
        let res = new Response(request, response);
        let body = new Buffer(1024);
        res.body = body;
        res.calculateLength();
        expect(res.length).to.equal(1024);
        done();
    });

    it("should delete 'Content-Length' if body not exist", function(done){
        let res = new Response(request, response);
        res.length = 100;
        res.calculateLength();
        expect(res.headers).to.not.have.property('Content-Length');
        done();
    });
});
