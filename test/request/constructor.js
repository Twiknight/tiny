'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');
const urlParse = require('url').parse;

describe('request.constructor', function(){


    it('should raise TypeError if no req passed in', function (done) {
        expect(function(){
            let req = new Request();
        }).to.throw('Requst must accept an IncomingMessage as parameter but get undefined.');
        done();
    });

    it('should hold req passed in', function (done) {
        let req = httpMocks.createRequest({
            method: 'PUT',
            url: '/user/tobi',
            headers:{
                host:'localhost:3000',
                accept:'*/*'
            }
        });
        let _req = new Request(req);
        expect(_req._req).to.equal(req);
        done();
    });
});
