const express = require('express');
const app = express();
const socketIo = require('socket.io');

app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(7773);
const io = socketIo(expressServer);

io.on('connection',(socket)=>{
    socket.emit('dataFromServer',{
        data:'Welcome!'
    });

    socket.on('dataToServer',(toData)=>{
        console.log(toData);
    })
})