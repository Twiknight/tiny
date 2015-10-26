'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const Response = require('../../lib/response');
const httpMocks = require('node-mocks-http');
const urlParse = require('url').parse;

describe('response.constructor', function(){
    it('should raise TypeError if no param passed in', function (done) {
        expect(function(){
            let response = new Response();
        }).to.throw('Response must accept a Request and a http.ServerResponse as parameters.');
        done();
    });

    it('should raise TypeError if no request passed in', function (done) {
        let req = httpMocks.createRequest({
            method: 'PUT',
            url: '/user/tobi',
            headers:{
                host:'localhost:3000',
                accept:'*/*'
            }
        });
        let res = httpMocks.createResponse();
        expect(function(){
            let response = new Response(res);
        }).to.throw('Response must accept a Request and a http.ServerResponse as parameters.');
        done();
    });

    it('should raise TypeError if no response passed in', function (done) {
        let req = httpMocks.createRequest({
            method: 'PUT',
            url: '/user/tobi',
            headers:{
                host:'localhost:3000',
                accept:'*/*'
            }
        });
        let res = httpMocks.createResponse();
        expect(function(){
            let response = new Response(req);
        }).to.throw('Response must accept a Request and a http.ServerResponse as parameters.');
        done();
    });
});
