'use strict'

const expect = require('chai').expect;
const Tiny = require('../lib/app');
const http = require('http');
const https = require('https');


describe('app.js', function () {
    describe('register', function () {
        it('should response to "request" event', function (done) {
            let app = new Tiny();
            let bar = undefined;
            let handler = function() {
                bar = 1;
            };
            app.register(handler);
            app.server.emit('request');
            process.nextTick(function() {
                expect(bar).to.equal(1);
                done();
            });
        });

        it('should throw an error if a nothing is passed', function (done) {
            let app = new Tiny();
            expect(app.register).to.throw('Tiny.register must accept a function as parameter but get undefined.');
            done();
        });

        it('should throw an error if a non-function is passed', function (done) {
            let app = new Tiny();
            let func = function () {
                app.register(1);
            }
            expect(func).to.throw('Tiny.register must accept a function as parameter but get number.');
            done();
        });
    });
});
