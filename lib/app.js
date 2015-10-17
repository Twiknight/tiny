'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var Tiny = (function () {
    function Tiny() {
        _classCallCheck(this, Tiny);

        this.server = _http2['default'].createServer();
    }

    _createClass(Tiny, [{
        key: 'register',
        value: function register(func) {
            if (typeof func !== 'function') {
                throw new TypeError('register must accept a function as parameter but get ' + typeof func + '.');
            }

            this.server.on('request', func);
        }
    }, {
        key: 'listen',
        value: function listen(port) {
            var _port = parseInt(port, 10);
            if (isNaN(_port)) {
                throw new TypeError('listen must accept a integer as parameter but get ' + typeof port);
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