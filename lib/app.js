'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var Tiny = (function () {

  /*
   * create a Tiny instance.
   * you need credential options to set up a https server.
   * Example:
   *
   *   const fs = require('fs');
   *
   *   const options = {
   *      key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
   *      cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
   *   };
   *   let tiny = new Tiny(options);
   *
   * For http servers:
   *   let tiny = new Tiny();
   *
   * @param {Object} httpsOptions
   */

  function Tiny(httpsOptions) {
    _classCallCheck(this, Tiny);

    //property declaration
    this.server = undefined;
    this.requestHandler = undefined;

    if (httpsOptions && typeof httpsOptions === 'object') {
      this.server = _https2['default'].createServer(httpsOptions);
    } else {
      this.server = _http2['default'].createServer();
    }
  }

  /*
   * bind a hanler function to the server's 'request' event.
   *
   * @param {Function} func
   * @public
   */

  _createClass(Tiny, [{
    key: 'register',
    value: function register(func) {
      if (typeof func !== 'function') {
        throw new TypeError('Tiny.register must accept a function as parameter but get ' + typeof func + '.');
      }

      this.server.on('request', func);
    }

    /*
     * listen to a port for http requests
     *
     * @param {Number} port
     * @public
     */
  }, {
    key: 'listen',
    value: function listen(port) {
      var _port = parseInt(port, 10);
      if (isNaN(_port)) {
        throw new TypeError('Tiny.listen must accept a integer as parameter but get ' + typeof port);
      }
      try {
        this.server.listen(_port);
      } catch (e) {
        throw e;
      }
    }
  }]);

  return Tiny;
})();

exports['default'] = Tiny;
module.exports = exports['default'];
