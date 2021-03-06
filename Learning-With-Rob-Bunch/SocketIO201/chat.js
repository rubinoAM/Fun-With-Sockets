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
    socket.emit('dataFromServer',{data:'Welcome!'});
    socket.on('dataToServer',(toData)=>{
        console.log(toData);
    })
    socket.join('level1');
    io.of('/').to('level1').emit('joined',`${socket.id}: Here I am. Rock you like a hurricane.`);
});

//Server Socket for /admin
const adminNamespace = io.of('/admin');

adminNamespace.on('connection',(socket)=>{
    console.log("!!!!");
    adminNamespace.emit('welcome',"Welcome to the admin channel!");
});