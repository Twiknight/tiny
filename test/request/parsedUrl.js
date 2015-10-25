'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.parsedUrl', function () {
    let requestOpts = {
        method: 'PUT',
        url: '/search?q=tobi',
        headers:{
            host:'google.com:8080',
            accept:'*/*'
        }
    };
    let req = httpMocks.createRequest(requestOpts);
    let request = new Request(req);

    it('should return parsedUrl', function(done){
        expect(request.parsedUrl).to.exist;
        done();
    });

    it.skip('should return pareseUrl when using https', function(done){
        // TODO: create test for https
        expect(request.parsedUrl).to.exist;
        done();
    });
});
