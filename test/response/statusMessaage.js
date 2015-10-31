'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');

describe('response.statusMessage', function(){
    let req = httpMocks.createRequest();
    let res = httpMocks.createRequest();

    it('should throw error if not set to string', function(done){
        let response = new Response(req, res);
        function shouldthrow(){
            response.statusMessage = 1;
        }
        expect(shouldthrow).to.throw('statusMessage must be string.');
        done();
    });

    it('should not throw if set to null', function(done){
        let response = new Response(req, res);
        function shouldNotThrow() {
            response.statusMessage = null;
        }
        expect(shouldNotThrow).to.not.throw;
        done();
    });

    it('should return status message if set', function(done){
        let response = new Response(req, res);
        response.statusMessage = 'this is a custom msg.';
        expect(response.statusMessage).to.equal('this is a custom msg.');
        done();
    });

    it('should look up http.STATUS_CODES if not set or set null', function(done){
        let response = new Response(req, res);
        response.statusCode = 404;
        expect(response.statusMessage).to.equal('Not Found');
        done();
    });

    it('should return undefined if fail to find', function(done){
        let response = new Response(req, res);
        response.statusCode = 1;
        expect(response.statusMessage).to.be.undefined;
        done();
    });
});
