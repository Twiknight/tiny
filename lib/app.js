'use strict'

const http = require('http');
const https = require('https');

class Tiny {

  /**
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
  constructor(httpsOptions) {
    //property declaration
    this.server = undefined;
    this.requestHandler = undefined;

    if(httpsOptions && typeof httpsOptions === 'object'){
      this.server = https.createServer(httpsOptions);
    }
    else{
      this.server = http.createServer();
    }
  }

  /**
   * bind a hanler function to the server's 'request' event.
   *
   * @param {Function} func
   * @public
   */
  register(func){
    if(typeof func !=='function'){
      throw new TypeError(`Tiny.register must accept a function as parameter but get ${typeof func}.`);
    }

    this.server.on('request',func);
  }

  /**
   * listen to a port for http requests
   *
   * @param {Number} port
   * @public
   */
  listen(port){
    let _port = parseInt(port, 10);
    if(isNaN(_port)){
        throw new TypeError(`Tiny.listen must accept a integer as parameter but get ${typeof port}`);
    }
    try{
        this.server.listen(_port);
    }catch(e){
        throw e;
    }
  }
}

module.exports = Tiny;
