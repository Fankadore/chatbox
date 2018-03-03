"use strict";

// Express Routing - resolves HTTP requests
const express = require('express');
const app = express();
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client/', express.static(__dirname + '/client'));

// HTTP Server - listens for connections on specified port
const server = require('http').createServer(app);
const port = process.env.PORT || 2000;
server.listen(port, () => console.log("Server started. Listening on port " + port));

// Websockets - real-time communication with clients
const io = require('socket.io')(server);
const clients = [];
io.sockets.on('connection', function(socket) {
    socket.id = findLowestId();
    clients[socket.id] = socket;
    console.log("Client connected with Id: " + socket.id);
    socket.emit('login', {id: socket.id});
    socket.emit('chatDisplay', {id: 'server', message: "Hello World!"});

    socket.on('chatSubmit', function(data) {
        if (data.message) {
            clients.forEach(function(client) {
                client.emit('chatDisplay', {id: socket.id, message: data.message});
            });
        }
    });

    socket.on('disconnect', function() {
        console.log("Client disconnected with Id: " + socket.id);
        delete clients[socket.id];
    });
});

function findLowestId() {
    for (let id = 0; id <= clients.length; id++) {
        if (!clients[id]) {
            return id;
        }
    }
}