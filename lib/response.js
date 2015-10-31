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

     /**
      * @return {Number} the header item Content -Length
      */
      get length(){
          return this.headers['Content-Length'];
      }

      /**
       * set the header length,
       * NOTE  if you're not sure about the length, use calculateLength instead.
       * @param {Number} int length
       */
       set length(len){
           if('number' !== typeof len){
               throw TypeError(`response.length must be an Interger but got ${typeof len}.`);
           }
           if(parseInt(len) !== len || len <= 0){
               throw TypeError(`response.length must be a positive Interger but got ${len}.`);
           }

           this.headers['Content-Length'] = len;
       }

       /**
         *calculate the Content-Length according to response body.
       */
       calculateLength(){
           let _len = this.body? this.body.length: 0;
           if(_len){
               this.headers['Content-Length'] = _len;
           }else{
               if('Content-Length' in this.headers){
                   delete this.headers['Content-Length'];
               }
           }
       }

       /**
         * @return the Content-Type of headers
         */
       get type(){
           return this.headers['Content-Type'];
       }

       /**
        * @param {String} the Content-Type
        */
       set type(value){
           if('string' != typeof value){
               throw TypeError(`response.type must be a string bug got ${typeof value}.`);
           }
           this.headers['Content-Type'] = value;
       }

       /**
        * remove Content-Type from headers
        */
       removeType(){
           if('Content-Type' in this.headers){
               delete this.headers['Content-Type'];
           }
       }

       /**
        * @return {Buffer} the response body
        */
       get body(){
           return this._body;
       }

       /**
        * @param {Buffer} the response body
        */
        set body(value){
            if(!value){
                this._body = undefined;
                return;
            }

            if(Buffer.isBuffer(value)){
                this._body = value;
            }
            else {
                throw TypeError('response.body must be Buffer.');
            }
        }

        /**
         * delete body of the response.
         */
        removeBody(){
            if(this._body){
                delete this._body;
            }
            this.calculateLength();
            this.removeType();
        }

        /**
          * send response
          */
        send(){
            this.calculateLength();
            this._response.writeHead(this.statusCode,this.headers);
            this._response.end(this.body);
        }
}

module.exports = Response;
