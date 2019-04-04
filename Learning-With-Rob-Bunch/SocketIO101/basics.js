const http = require('http'); //You can also use this with Express
const socketIo = require('socket.io');

const server = http.createServer((req,res)=>{
    res.end("BARK BARK");
});

const io = socketIo(server);

io.on('connection',(socket)=>{
    socket.emit('Welcome to the jungle!');
    socket.on('message',(msg)=>{
        console.log(msg);
    });
});

server.listen(7772);