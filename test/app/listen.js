'use strict'

const assert = require('chai').assert;
const expect = require('chai').expect;
const Tiny = require('../../lib/app');
const http = require('http');
const https = require('https');

describe('app.js', function () {
    describe('listen', function () {
        it('should listen to a port if an integer is passed', function (done) {
            let app = new Tiny();
            let target = undefined;

            app.register(function(res, req){
                req.writeHead(200);
                req.end();
            });
            app.listen(3000);
            http.get('http://localhost:3000', function(req){
                expect(req.statusCode).to.equal(200);
                app.server.close();
                done();
            });
        });

        it('should throw an error if nothing passed', function(done){
            let app = new Tiny();
            let target = undefined;

            expect(app.listen).to.throw('Tiny.listen must accept a integer as parameter but get undefined')
            done();
        });

        it('should throw an error if non-integer passed', function(done){
            let app = new Tiny();
            let target = undefined;

            expect(function () {
                app.listen({})
            }) .to.throw('Tiny.listen must accept a integer as parameter but get object')
            done();
        });
    });
});
