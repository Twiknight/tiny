'use strict'

const expect = require('chai').expect;
const Request = require('../../lib/request');
const httpMocks = require('node-mocks-http');

describe('request.accepts', function () {
    it('should return single accept type', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              'content-length': 3000,
              host:'google.com:80',
              accept:'audio/*'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);
      expect(request.accepts).to.have.property('audio/*',1);
      done();
    });

    it('should return multiple accept type', function(done){
      let requestOpts = {
          method: 'PUT',
          url: '/user/tobi',
          headers:{
              host:'google.com:80',
              accept: 'audio/*; q=0.2, audio/basic'
          }
      };
      let req = httpMocks.createRequest(requestOpts);
      let request = new Request(req);

      expect(request.accepts).to.have.property('audio/*',0.2);
      expect(request.accepts).to.have.property('audio/basic',1);
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

      expect(request.accepts).to.have.property('*/*',1);
      done();
    });
});
