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
});

//Socket for /admin
io.of('/admin').on('connection',(socket)=>{
    console.log("!!!!");
    io.of('/admin').emit('welcome',"Welcome to the admin channel!");
});