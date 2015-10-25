'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.headers', function () {
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

    it('should equal req.headers', function(done){
        expect(request.headers).to.equal(req.headers);
        done();
    });
});
