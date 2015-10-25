'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.protocol', function () {
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

    it('should return protocol', function(done){
        expect(request.protocol).to.equal("http");
        done();
    });

    it.skip('should return protocol when using https', function(done){
        // TODO: create test for https
        expect(request.protocol).to.equal("https");
        done();
    });
});
