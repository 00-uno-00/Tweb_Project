import io from "socket.io-client";

let name=null;
let roomNo=null;
let chat = io('/chat');

function init(){
    document.getElementById('chat_form').style.display='block';
    document.getElementById('chat_interface').style.display='none';
    initChatSocket();
}


function initChatSocket(){
    chat.on('joined',function(room,userId){
        if(userId === name){
            hideLoginInterface(room,userId);
        }else{
            writeOnChatHistory('<b>'+userId+'</b>'+' joined room '+room);
        }
    });
    chat.on('chat',function(room,userId,chatText){
        let who=userId;
        if(userId===name) who='Me';
        writeOnChatHistory('<b>'+who+':</b>'+chatText);
    });
}


function sendChatText(){
    let chatText=document.getElementById('chat_input').value;
    chat.emit('chat', roomNo, name, chatText);
}

function connectToRoom(){
    name = document.getElementById('name').value;
    roomNo = document.getElementById('roomNo').value;
    document.getElementById('btn_join').value='Join '+roomNo;
    if (!name) name = 'Unknown-' + Math.random();
    chat.emit('create or join', roomNo, name);
}

function writeOnChatHistory(text) {
    let history = document.getElementById('chat_history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';
}

function hideLoginInterface(room, userId) {
    document.getElementById('form_chat').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML= userId;
    document.getElementById('in_room').innerHTML= ' '+room;
}