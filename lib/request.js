'use strict'
const urlParse = require('url').parse;

class Request {
    constructor(req) {
        this._req = req;
        this.url_info = urlParse(this._req.url, true);
    }

    /*
      * @return {String} method
      */
    get method(){
        return this._req.method;
    }

    /*
     * @return {Object} headers
     */
    get headers(){
        return this._req.headers;
    }

    /*
      * @return {Object} body
      */
    get body(){

    }

    /*
      * @return {String} href
      */
    get href(){

    }

    /*
     * @return {String} protocol
     */
    get protocol(){

    }

    /*
     * return the HTTP host of headers.
     * @return {String} host
     */
    get host(){

    }

    /*
      * @return {String} port
      */
    get port(){

    }

    /*
      *@return {Object} query
      */
    get query(){

    }

    /*
      *@return {Object} pareseUrl
      */
    get parsedUrl(){

    }
}

module.exports = Request;
