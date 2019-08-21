const app = require('./src/app.js');
const debug = require('debug')('james:server');
const http = require('http');

const port = process.env.port || '3000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port);
//server.on('error', onError);
//server.on('listening', onLinstening);

console.log('API rodando na porta: ' + port);

function onError(error) {
    console.log('error: '+ onError);
}

function onLinstening(lister) {
    console.log('onLinstening: ' + lister);

}