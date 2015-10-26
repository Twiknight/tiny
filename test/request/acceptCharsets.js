'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.acceptCharsets', function () {
    it('should return single accept charset', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              'content-length': 3000,
              host:'google.com:80',
              'accept-charset':'utf-8'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);
      expect(request.acceptCharsets).to.have.property('utf-8',1);
      done();
    });

    it('should return multiple accept charsets', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              host:'google.com:80',
              'accept-charset': 'iso-8859-5, unicode-1-1;q=0.8'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);

      expect(request.acceptCharsets).to.have.property('iso-8859-5',1);
      expect(request.acceptCharsets).to.have.property('unicode-1-1',0.8);
      done();
    });

    it('should return default if not fixed', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              host:'google.com:80'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);

      expect(request.acceptCharsets).to.have.property('*',1);
      done();
    });
});
