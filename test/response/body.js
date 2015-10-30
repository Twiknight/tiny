'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');

describe('response.body', function(){

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

    it('should throw TypeError if not set to Buffer', function (done) {
        let res = new Response(request, response);
        expect(function(){
            res.body = 'hello';
        }).to.throw('response.body must be Buffer.');
        done();
    });

    it('should return undefined when set to null', function (done) {
        let res = new Response(request, response);
        res.body = null;
        expect(res.body).to.be.undefined;
        done();
    });

    it('should be correctly set to Buffer', function(done){
        let res = new Response(request, response);
        let bf = new Buffer(1024)
        res.body = bf;
        expect(res.body).to.equal(bf);
        done();
    });

    it('should successfully remove', function(done){
        let res = new Response(request, response);
        let bf = new Buffer(1024)
        res.body = bf;
        expect(res.body).to.equal(bf);
        res.removeBody();
        expect(res).to.not.have.property('_body');
        done();
    });
});
