'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.host', function () {
    let requestOpts = {
        method: 'PUT',
        url: '/user/tobi',
        headers:{
            host:'google.com:80',
            accept:'*/*'
        }
    };
    let req = httpMocks.createRequest(requestOpts);
    let request = new Request(req);

    it('should return req.headers.host', function(done){
        expect(request.host).to.equal("google.com:80");
        done();
    });

    it.skip('should return req.headers.href when using https', function(done){
        // TODO: create test for https
        expect(request.host).to.equal("google.com:80");
        done();
    });
});
