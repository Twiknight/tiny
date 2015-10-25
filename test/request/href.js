'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.href', function () {
    let requestOpts = {
        method: 'PUT',
        url: '/user/tobi',
        headers:{
            host:'localhost:3000',
            accept:'*/*'
        }
    };
    let req = httpMocks.createRequest(requestOpts);
    let request = new Request(req);

    it('should return req.href', function(done){
        expect(request.href).to.equal("http://localhost:3000/user/tobi");
        done();
    });

    it.skip('should return req.href when using https', function(done){
        // TODO: should create case for https
        expect(request.href).to.equal("https://localhost:3000/user/tobi");
        done();
    });
});
