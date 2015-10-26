'use strict'
const urlParse = require('url').parse;
const http = require('http');
const https = require('https');
const parseType = require('content-type').parse;

class Request {
    constructor(req) {
        if(!req) {
            throw TypeError(`Requst must accept an IncomingMessage as parameter but get ${typeof req}. `)
        }
        this._req = req;
        this._connection = req.socket;
        this._href = `${this.protocol}://${req.headers.host+req.url}`;
        this.url_info = urlParse(this.href, true, true);

        this.defaultCharset = 'utf-8';
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

    /**
     * @return {Object} parsed content-type object
     */
    get type(){
      if(!this._type){
        let type = this._loadHeader('content-type');
        if(!type){
          return undefined;
        }
        this._type = parseType(type);
      }
      return this._type;
    }

    /**
     * @return {String} user-agent
     */
    get charset(){
      return this.type['parameters']['charset']||this.defaultCharset;
    }

    /**
     * @return {Number} content-length
     */
    get contentLength(){
      const _len = this._loadHeader('content-length');
      let len = parseInt(_len);
      if(len){
        return len;
      }
    }

    /**
     * @return {Object} acceptable media refs
     */
    get accepts(){
      if(this._accepts){
        return this._accepts;
      }

      const accept = this._loadHeader('accept');
      if(!accept){
        this._accepts = {'*/*':1};
      }else{
        this._accepts = parseAccept(accept);
      }

      return this._accepts;
    }

    /**
     * @return {Object} acceptable charsets
     */
    get acceptCharsets(){
      if(this._acceptCharsets){
        return this._acceptCharsets;
      }

      const charsets = this._loadHeader('accept-charset');
      if(!charsets){
        this._acceptCharsets = {'*':1};
      }else{
        this._acceptCharsets = parseAccept(charsets);
      }

      return this._acceptCharsets;
    }

    /**
     * @return {Object} accptable encodings
     */
    get acceptEncodings(){
      if(this._acceptEncodings){
        return this._acceptEncodings;
      }

      const encodings = this._loadHeader('accept-encoding');
      if(!encodings){
        this._acceptEncodings = {'*':1};
      }else{
        this._acceptEncodings = parseAccept(encodings);
      }

      return this._acceptEncodings;
    }

    /**
     * load property from headers
     * @param {String} field name
     * @return {String} field value
     * @private
     */
    _loadHeader(field){
      return this.headers[field]||'';
    }
}

/**
 * parse accept, accept-charset, accept-encoding in http headers
 * @param {String} accept string got from headers
 * @return {Object} parsed accepts
 */
function parseAccept(accepts){
  let refs = accepts.split(/\s*,\s*/);
  let result = {};
  for(let ref of refs){
    let sepIdx = ref.indexOf(';');
    if(sepIdx===-1){
      result[ref] = 1;
    }
    else{
      let vals = ref.split(/\s*;\s*/);
      let field = vals[0];
      let eqIdx = vals[1].indexOf('=');
      if(eqIdx === -1){
        result[field] = 1;
      }else {
        result[field] = parseFloat(vals[1].slice(eqIdx+1));
      }
    }
  }
  return result;
}

module.exports = Request;
