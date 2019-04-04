const http = require('http');
const webSocket = require('ws');

const server = http.createServer((req,res)=>{
    res.end("BARK BARK");
});

const wss = new webSocket.Server({
    server //Before ES6 this would be server: server
});
wss.on('headers',(headers,req)=>{
    console.log(headers);
})

wss.on('connection',(ws,req)=>{
    ws.send('Welcome to the jungle.')
})

server.listen(9101);