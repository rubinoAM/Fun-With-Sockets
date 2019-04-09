//Express
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));

//Socket.io
const socketIo = require('socket.io');
const expressServer = app.listen('5052');
const io = socketIo(expressServer);

//Helmet
const helmet = require('helmet');
app.use(helmet());

module.exports = {
    app,
    io
}