'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');


describe('response.type', function(){

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

    it('should throw TypeError if not set to string', function (done) {
        let res = new Response(request, response);
        expect(function(){
            res.type = 123;
        }).to.throw(`response.type must be a string bug got ${typeof 123}.`);
        done();
    });

    it('should return Content-Type', function (done) {
        let res = new Response(request, response);
        res.type = 'application/json';
        expect(res.type).to.equal('application/json');
        expect(res.headers).to.have.property('Content-Type','application/json');
        done();
    });

    it('should be successfully removed', function (done) {
        let res = new Response(request, response);
        res.type = 'application/json';
        expect(res.type).to.equal('application/json');
        res.removeType();
        expect(res.type).to.be.undefined;
        expect(res.headers).to.not.have.property('Content-Type');
        done();
    });
});
