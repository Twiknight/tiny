'use strict'
const urlParse = require('url').parse;
const http = require('http');
const https = require('https');

class Request {
    constructor(req) {
        if(!req) {
            throw TypeError(`Requst must accept an IncomingMessage as parameter but get ${typeof req}. `)
        }
        this._req = req;
        this._connection = req.socket;
        this._href = `${this.protocol}://${req.headers.host+req.url}`;
        this.url_info = urlParse(this.href, true, true);
    }

    /**
      * @return {String} method
      */
    get method(){
        return this._req.method;
    }

    /**
     * @return {Object} headers
     */
    get headers(){
        return this._req.headers;
    }

    /**
      * @return {Object} body
      */
    get body(){
        return this._req.body;
    }

    /**
      * @return {String} href
      */
    get href(){
        return this._href;
    }

    /**
     * @return {String} protocol
     */
    get protocol(){
        if(this._connection && this._connection.encrypted){
            return 'https';
        }
        return 'http';
    }

    /**
     * return the HTTP host of headers.
     * @return {String} host
     */
    get host(){
        return this.url_info.host;
    }

    /**
      * @return {String} port
      */
    get port(){
        return this.url_info.port;
    }

    /**
      *@return {Object} query
      */
    get query(){
        return this.url_info.query;
    }

    /**
      *@return {Object} pareseUrl
      */
    get parsedUrl(){
        return this.url_info;
    }
}

module.exports = Request;
