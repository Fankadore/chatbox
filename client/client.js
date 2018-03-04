"use strict";

let chatBox = document.querySelector('.chat-box');
let input = document.querySelector('.chat-input');
let sendButton = document.querySelector('.chat-send');
let clearButton = document.querySelector('.chat-clear');
input.focus();

const socket = io.connect();
socket.on('login', function(data) {
    console.log("You have been assigned Id: " + data.id);
});


sendButton.onclick = function() {
    submitChat();
};

input.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        submitChat();
    }
});

function submitChat() {
    socket.emit('chatSubmit', {message: input.value});
    input.value = "";
    input.focus();
}


socket.on('chatDisplay', function(data) {
    let message = data.message;
    if (data.id >= 0) {
        message = "Chatter " + data.id + ": " + message;
    }
    displayChat(message);
});

function displayChat(message) {
    chatBox.innerHTML += '<p class="message style-' + style + '">' + message + '</p>';
    console.log(message);
}


clearButton.onclick = function() {
    clearChatbox();
};

function clearChatbox() {
    chatBox.innerHTML = '<p class="message style-' + style + '">Chatbox cleared.</p>';
    console.log("Chatbox cleared.");
}

let style = 0;
function toggleStyle() {
    let previousStyle = style;
    style++;
    if (style > 3) {
        style = 0;
    }
    let elements = document.querySelectorAll('.style-' + previousStyle);
    elements.forEach(function(element) {
        element.classList.remove('style-' + previousStyle);
        element.classList.add('style-' + style);
    });
}