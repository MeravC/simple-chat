const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    
    socket.broadcast.emit('chat message','a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('chat message','a user disconnected');
    });
});

server.listen(3000, () => {
    console.log(`listening on port 3000`);
});

