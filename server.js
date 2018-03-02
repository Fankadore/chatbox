"use strict";

const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

let userId = 999999;

app.get('/login/:userId(\\d{6})', function(req, res) {
    userId = req.params.userId;
    res.send(userId + " has logged on.");
});

const server = app.listen(2000, function() {
    let host = server.address().address;
    let port = server.address().port;
    
    console.log("Server listening at " + host + ":" + port);
});