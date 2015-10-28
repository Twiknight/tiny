'use strict'

const statusCodes = require('http').STATUS_CODES;

class Response {
    constructor(request,response) {
        if(!request || !response){
            throw TypeError('Response must accept a Request and a http.ServerResponse as parameters.');
        }
        this._request = request;
        this._response = response;
        this._headers = {};
        this.body = {};
    }

    /**
     * @return {Object} request
     */
     get request(){
         return this._request;
     }

     /**
      * @return {Object} headers
      */
      get headers(){
          return this._headers;
      }

      /**
       * set the headers
       * @param {Object} headers
       */
      set headers(obj){
          if(typeof obj !== 'object'){
              throw TypeError(`Response.headers should only be set to objects but got ${typeof obj}.`);
          }
          this._headers = obj;
      }

      /**
       * @return {Number} status code
       */
      get statusCode(){
          return this._status;
      }

      /**
       * @param {Number} status code to set
       */
      set statusCode(code){
          if('number' !== typeof code){
              throw TypeError(`status code should be set to a number but got ${typeof code}.`);
          }
          if(parseInt(code) !== code){
              throw TypeError('status code should be int.');
          }
          this._status = code;
      }

      /**
        * @return {String} status message
        */
     get statusMessage(){
         if(this._message){
             return this._message;
         }
         return statusCodes[this.statusCode];
     }

     /**
       * set self-defined status message.
       * @param {String} status message
       */
     set statusMessage(msg){
         if(msg && 'string' !== typeof msg){
             throw TypeError('statusMessage must be string.')
         }
         this._message = msg;
     }
}

module.exports = Response;
