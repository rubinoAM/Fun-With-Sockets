const express = require('express');
const socketIo = require('socket.io');

const app = express();
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

    socket.on('newMsgToServer',(msg)=>{
        //console.log(msg);
        io.emit('msgToClients',{
            text:msg.text,
        });
    });
});