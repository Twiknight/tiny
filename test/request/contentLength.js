'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.contentLength', function () {
    it('should return Content-Length', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              'content-length': 3000,
              host:'google.com:80',
              accept:'*/*'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);
      expect(request.contentLength).to.equal(3000);
      done();
    });

    it('should return undefined if "Content-Length" not passed', function(done){
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

      expect(request.contentLength).to.be.undefined;
      done();
    });
});
