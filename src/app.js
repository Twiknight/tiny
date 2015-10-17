import http from 'http'

class Tiny {
    constructor() {
        this.server = http.createServer();
    }
    register(func){
        if(typeof func !=='function'){
            throw new TypeError(`register must accept a function as parameter but get ${typeof func}.`);
        }

        this.server.on('request',func);
    }
    listen(port){
        let _port = parseInt(port, 10);
        if(isNaN(_port)){
            throw new TypeError(`listen must accept a integer as parameter but get ${typeof port}`);
        }
        try{
            this.server.listen(_port);
        }catch(e){
            throw e;
        }
    }
}

export default Tiny;
