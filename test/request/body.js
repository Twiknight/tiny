'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.body', function () {
    let requestOpts = {
        method: 'PUT',
        url: '/user/tobi',
        headers:{
            host:'localhost:3000',
            accept:'*/*'
        },
        body:"hello"
    };
    let req = httpMocks.createRequest(requestOpts);
    let request = new Request(req);

    it('should return req.body', function(done){
        expect(request.body).to.equal("hello");
        done();
    });
});
