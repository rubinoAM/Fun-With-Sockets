//Modules
const express = require('express');
const socketIo = require('socket.io');

//Server
const app = express();
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(7773);
const io = socketIo(expressServer);

//Main Connection
io.on('connection',(socket)=>{ //Root Namespace
    //Array to send back with images and endpoints for each namespace
    let nsData = namespaces.map((ns)=>{
        return {
            img: ns.img,
            endpoint: ns.endpoint,
        }
    })

    //Send data to client
    socket.emit('nsList',nsData);
});

//Namespaces
let namespaces = require('./data/namespaces');
namespaces.forEach((namespace)=>{
    io.of(namespace.endpoint).on('connection',(nsSocket)=>{
        console.log(`${nsSocket.id} has joined ${namespace.endpoint}`)
        nsSocket.emit('nsRoomLoad',namespaces[0].rooms);
        nsSocket.on('joinRoom',(room,numUserCB)=>{
            nsSocket.join(room);
            io.of('/wiki').in(room).clients((err,clients)=>{
                numUserCB(clients.length);
            })
            //History
        })
    })
})