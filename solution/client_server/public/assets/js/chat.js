let name = null;
let roomNo = null;
let chat1;

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
            writeOnChatHistory('<b>' + userId + '</b>' + ' joined room ' + room, 'system');
        }
    });

    chat1.on('left', function (room, userId) {
        writeOnChatHistory('<b>' + userId + '</b>' + ' left room ' + room, 'system');
    });

    chat1.on('chat1', function (room, userId, chatText) {
        let who = userId;
        let messageClass = 'other';
        if (userId === name) {
            who = 'Me';
            messageClass = 'me';
        }
        writeOnChatHistory('<b>' + who + ':</b> ' + chatText, messageClass);
    });
}

function sendChatText() {
    let chatText = document.getElementById('message-input').value;
    chat1.emit('chat1', roomNo, name, chatText);
    document.getElementById('message-input').value = '';
}

function connectToRoom() {
    name = document.getElementById('name').value;
    const dropdown1 = document.getElementById('dropdown1').value;
    const dropdown2 = document.getElementById('dropdown2').value;
    if (!name || !dropdown1) {
        alert('Please fill in all fields.');
        return;
    }

    if (dropdown1 === 'Championship' && !dropdown2) {
        alert('Please select a championship.');
        return;
    }

    switch (dropdown1) {
        case 'Championship':
            roomNo = dropdown2;
            break;
        case 'Team':
            roomNo = dropdown2;
            break;
        default:
            alert('Invalid room selection.');
            return;
    }

    chat1.emit('create or join', roomNo, name);
}

async function loadDropDown2(option) {
    const dropdown2 = document.getElementById('dropdown2');
    dropdown2.innerHTML = ''; // Clear existing options
    if (option === 'Championship') {
        // Assuming you have a list of championships. This is just an example.
        const championships = await axios.get('chat/getAllChampionships');
        const data = championships.data;
        data.forEach(championship => {
            const optionElement = document.createElement('option');
           optionElement.value = championship.name.replace('-', ' ').toUpperCase();
            optionElement.textContent = championship.name.replace('-', ' ').toUpperCase();
            dropdown2.appendChild(optionElement);
        });
    } else if (option === 'Team') {
        // Assuming you have a list of teams. This is just an example.
        const teams = await axios.get('chat/getAllTeams');
        const data = teams.data;
        data.forEach(team => {
            const optionElement = document.createElement('option');
            optionElement.value = team.name.replace('-', ' ').toUpperCase();
            optionElement.textContent = team.name.replace('-', ' ').toUpperCase();
            dropdown2.appendChild(optionElement);
        });
    }
}

function writeOnChatHistory(text, messageClass) {
    let history = document.getElementById('chat_history');
    let paragraph = document.createElement('p');
    paragraph.className = messageClass;
    paragraph.innerHTML = text;
    history.appendChild(paragraph);

    history.scrollTop = history.scrollHeight - history.clientHeight; // Ensure scrolling to the bottom
    document.getElementById('message-input').value = '';
}

function showDropdown2() {
    var dropdown1 = document.getElementById("dropdown1");
    var dropdown2 = document.getElementById("dropdown2");
    switch (dropdown1.value) {
        case "Championship":
            loadDropDown2("Championship");
            break;
        case "Team":
            loadDropDown2("Team");
            break;
        default:
            dropdown2.innerHTML = "";
            break;
    }

    if (dropdown1.value !== "") {
        dropdown2.style.display = "inline-block";
    } else {
        dropdown2.style.display = "none";
    }
}

function leaveRoom(){
    chat1.emit('leave', roomNo, name);
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';
    document.getElementById('chat_history').innerHTML = '';
    name = null;
    roomNo = null;
}

function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML = userId;
    document.getElementById('in_room').innerHTML = ' ' + room;
}
