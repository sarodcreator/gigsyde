// const logEvents = require('./logEvents');

// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {};

// // initialize the project
// const myEmitter = new MyEmitter();

// // add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//     // Emit event
//     myEmitter.emit('log', 'Logevent Emitted!');
// }, 2000);

const http =require('https');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {

};

const myEmitter = new Emitter();

const PORT = process.env.port || 5300;

const server = http.createServer((req, res) => {
    console.log(res.url, req.method);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));