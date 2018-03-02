"use strict";

const app = require('express')();
const port = process.env.PORT || 2000;
const server = require('http').createServer(app).listen(port, () => console.log("Listening on port " + port));
const io = require('socket.io')(server);

io.sockets.on('connection', function(socket){
    console.log("connection");
    socket.emit('connect', {message: "connected"});
 });

 app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
 });