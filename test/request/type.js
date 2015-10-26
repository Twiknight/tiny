'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.type', function () {
    it('should return an object', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              'content-type': 'text/xml',
              host:'google.com:80',
              accept:'*/*'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);
      expect(request.type).to.be.instanceof(Object);
      done();
    });

    it('should return undefined if "content-type" not passed', function(done){
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

      expect(request.type).to.be.undefined;
      done();
    });
});
