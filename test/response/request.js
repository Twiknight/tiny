'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');
const urlParse = require('url').parse;

describe('response.request', function(){
    it('should return request', function (done) {
        let req = httpMocks.createRequest({
            method: 'PUT',
            url: '/user/tobi',
            headers:{
                host:'localhost:3000',
                accept:'*/*'
            }
        });
        let request = new Request(req);
        let res = new Response(request, httpMocks.createResponse());
        expect(res.request).to.equal(request);
        done();
    });
});
