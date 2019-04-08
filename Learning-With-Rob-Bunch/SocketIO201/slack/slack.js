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
        nsSocket.on('joinRoom',(roomJoin,numUserCB)=>{
            nsSocket.join(roomJoin);
            io.of('/wiki').in(roomJoin).clients((err,clients)=>{
                numUserCB(clients.length);
            })
            //Update History
            const nsRoom = namespace.rooms.find((room)=>{
                return room.title === roomJoin;
            })
            nsSocket.emit('historyUpdate',nsRoom.history);
        })

        nsSocket.on('newMsgToServer',(msg)=>{
            const fullMsg = {
                text:msg,
                time:Date.now(),
                username:"uname",
                avatar:'https://via.placeholder.com/30',
            }
            const roomTitle = Object.keys(nsSocket.rooms)[1];
            const nsRoom = namespace.rooms.find((room)=>{
                return room.title === roomTitle;
            })
            nsRoom.addMessage(fullMsg);
            io.of('/wiki').to(roomTitle).emit('msgToClients',fullMsg);
        })
    })
})