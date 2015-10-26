'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.accepts', function () {
    it('should return single accept encoding', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              'content-length': 3000,
              host:'google.com:80',
              'accept-encoding':'gzip'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);
      expect(request.acceptEncodings).to.have.property('gzip',1);
      done();
    });

    it('should return multiple accept encodings', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              host:'google.com:80',
              'accept-encoding': 'compress;q=0.5, gzip;q=1.0'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);

      expect(request.acceptEncodings).to.have.property('compress',0.5);
      expect(request.acceptEncodings).to.have.property('gzip',1);
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

      expect(request.acceptEncodings).to.have.property('*',1);
      done();
    });
});
