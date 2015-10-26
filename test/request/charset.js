'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.charset', function () {
    it('should default to "utf-8"', function(done){
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
      expect(request.charset).to.equal('utf-8');
      done();
    });

    it('should return charset', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              'content-type': 'text/xml; charset=GBK',
              host:'google.com:80',
              accept:'*/*'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);

      expect(request.charset).to.equal('GBK');
      done();
    });
});
