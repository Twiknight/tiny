'use strict'

const expect = require('chai').expect;
const Tiny = require('../../lib/app');
const http = require('http');
const https = require('https');

describe('app.js', function(){
   describe('constructor', function() {
       it('app.server should be a http.Server if no param is passed', function (done) {
            let app = new Tiny();
            expect(app.server).to.be
                .an.instanceof(http.Server);
            done();
       });

       it('app.sever should be a https.Server if an object is passed', function (done) {
            let app = new Tiny({});
            expect(app.server).to.be
                .an.instanceof(https.Server);
            done();
       });

       it('app.server should be a http.Server if a non-object is passed', function (done){
            let app = new Tiny('Im not an object');
            expect(app.server).to.be
                .an.instanceof(http.Server);
            done();
       });
   });
});
