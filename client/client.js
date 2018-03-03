"use strict";

let chatBox = document.querySelector('#chat-box');
let input = document.querySelector('#chat-input');
let sendButton = document.querySelector('#chat-send');
let clearButton = document.querySelector('#chat-clear');

const socket = io.connect();
socket.on('login', function(data) {
    console.log("You have been assigned Id: " + data.id);
});

sendButton.onclick = function() {
    submitChat(input.value);
    input.value = "";
};

function submitChat(message) {
    socket.emit('chatSubmit', {message: message});
}


socket.on('chatDisplay', function(data) {
    let message = data.message;
    if (data.id >= 0 || data.id === 'server') {
        message = data.id + ": " + message;
    }
    displayChat(message);
});

function displayChat(message) {
    chatBox.innerHTML += "<p>" + message + "</p>";
    console.log(message);
}


clearButton.onclick = function() {
    clearChatbox();
};

function clearChatbox() {
    chatBox.innerHTML = "";
    console.log("Chatbox cleared.");
}
