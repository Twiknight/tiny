# Chapter 1: Node HTTP module and a minimum server

## 1.0 Summary
In this chapter, we'll try to code out our first edition of tiny.

It will be a few lines of code that simply wrap the standard http lib.
Before we start coding, I will make a brief introduction to Node.js's HTTP lib and some terminology.

## 1.1 HTTP in Node
When Ryan Dahl launched Node, he was intended to create a web server based on V8 engine.
Though it's now a all-around platform, high concurrency web server is one of the cases that make full advantage of Node's events-driven and non-block features.

Node has a low-level HTTP API.
It will simply break the request into two parts,
then deliver it to costumer function with an response object that can send back byte streams to client.
So we need to parse the headers and body ourselves.

The good news is, it is quite easy to set up a HTTP server in Node.
If you've used Python, you'll feel familiar with the process of creating a server.

Now, let's see how it works with Node to set up a web server then handle a request:
- 1. We set up a server and listen to a port;
- 2. The port get a request and raise a 'request' event;
- 3. The server is notified ,then it passes the request and a server response object to our costumer function;
- 4. We handle the request and send back data streams to the client.

## 1.2 What does a framework do?
In the steps above, it is easy to verify that step 4 is what we should focus on if we are to set up a web site:
that's where the requirements are implemented.

But a framework is different. A framework doesn't work on certain requirements, but serves any possible cases.

To make it clearer, we can just simply divide a software into two parts: stable part and unstable part.
- The __stable part__ won't be modified in most cases and can be easily reused.
- The __unstable part__ may change with the requirements, and varies from project to project.

A framework always works as the __stable part__. It provides an easy access to modification and scaling the __unstable part__.

## 1.3 What will tiny provide?
Node has already provided us a HTTP server.
So we won't bother to re-invent one.
What we need to offer are those Node hasn't offered:
- A powerful parser for resolving request;
- An easy-to-use tool for sending response;
- A flexible router to combine different parts of a site;
- If necessary, other tools to accelerate developing with our framework.

To keep this chapter short, I plan to introduce the functions above in later chapters.
In this one, we will only provide interfaces to set up a server and register costumer code.

## 1.4 The first edition of tiny
__First__, create a file name `app.js` in folder `src`.

The first line would be:
```
import http from 'http';
```
It works the same as `var http = require('http');` in ES5.

__Second__, we create a class named `Tiny`
```
class Tiny{
  constructor(){}
  register(func){}
  listen(port){}
}
```
In this chapter this our `Tiny` will offer only 3 APIs.

`constructor` is called when you set up a new instance with the statement `new Tiny()`;

`register` allows user to register a function to handle the request and send back responses.

`listen` just wraps the `http.Server.listen` method and provide a simple Type check.


when you have finished this chapter, you can try it like this:
```
'use strict'

const Tiny = require('.././lib/app');

let myServer = new Tiny();
myServer.register(function(req,res){
    console.log(`request accept from: ${req.connection.remoteAddress}`);
    res.write("hello ");
    res.end("world!");
});

myServer.listen(3000);
```
Then you can run this demo, open your browser and navigate to http://localhost:3000.

But now you won't get anything at this moment:
we need to fill the `Tiny` class.

__Third__, Implement the class:

`constructor` :
```
constructor() {
    this.server = http.createServer();
}
```
We create and hold a `http.Server` object in `Tiny`.
Here we can also make `Tiny` inherit from `http.Server`, but in this case:
> Composition is better than inheritance.

Because class `Tiny` is sure to be modified in later chapters. Composition offers better malleability.

`register`:
```
register(func){
    if(typeof func !=='function'){
        throw new TypeError(`register must accept a function as parameter but get ${typeof func}.`);
    }

    this.server.on('request',func);
}
```
In fact, it just link the customer function to `request` event.

So what are all these before that line?
They are __Type checking__. You can never imagine what users will do with your interface. It is never a bad idea to check the input params if the interface is exposed to users.

`listen`:
```
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
```
It just does type checking and wraps the `http.Server.listen` method.

__Note__ that, the `http.Server.listen` method may throw an exception if you listen to a port already listened by someone else.
Here we simply catch and throw it. You can wrap it and add your own info as you like.

__Fourth__, Open your console and type:
```
gulp
```

Then try it out with your demo!
