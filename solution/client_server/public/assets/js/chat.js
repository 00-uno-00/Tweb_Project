
let name = null;
let roomNo = null;
let chat1 ;

function init() {
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';
    chat1 = io('/chat1');
    initChatSocket();
}

function initChatSocket() {
    chat1.on('joined', function (room, userId) {
        if (userId === name) {
            hideLoginInterface(room, userId);
        } else {
            writeOnChatHistory('<b>' + userId + '</b>' + ' joined room ' + room);
        }
    });

    chat1.on('cha1t', function (room, userId, chatText) {
        let who = userId;
        if (userId === name) who = 'Me';
        writeOnChatHistory('<b>' + who + ':</b> ' + chatText);
    });
}

function sendChatText() {
    let chatText = document.getElementById('message-input').value;
    chat1.emit('chat1', roomNo, name, chatText);
}

function connectToRoom() {
    name = document.getElementById('name').value;
    const dropdown1 = document.getElementById('dropdown1').value;

    if (!name || !dropdown1) {
        alert('Please fill in all fields.');
        return;
    }

    switch (dropdown1) {
        case 'option1':
            roomNo = 'Room1';
            break;
        case 'option2':
            roomNo = 'Room2';
            break;
        case 'option3':
            roomNo = 'Room3';
            break;
        default:
            alert('Invalid room selection.');
            return;
    }

    chat1.emit('create or join', roomNo, name);
}

function writeOnChatHistory(text) {
    let history = document.getElementById('chat_history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    document.getElementById('message-input').value = '';
}

function showDropdown2() {
    var dropdown1 = document.getElementById("dropdown1");
    var dropdown2 = document.getElementById("dropdown2");
    if (dropdown1.value !== "") {
        dropdown2.style.display = "block";
    } else {
        dropdown2.style.display = "none";
    }
}

function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML = userId;
    document.getElementById('in_room').innerHTML = ' ' + room;
}
