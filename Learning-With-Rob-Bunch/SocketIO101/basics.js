const http = require('http'); //You can also use this with Express
const socketIo = require('socket.io');

const server = http.createServer((req,res)=>{
    res.end("BARK BARK");
});

const io = socketIo(server);

server.listen(7772);