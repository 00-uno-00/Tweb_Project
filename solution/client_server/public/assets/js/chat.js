let name = null;
let roomNo = null;
let chat1;

/**
 * Initializes the chat application, sets up the socket connection, and shows the initial form.
 */

function init() {
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';
    chat1 = io('/chat1');
    initChatSocket();
}

/**
 * Sets up socket event listeners for chat functionality.
 */

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

/**
 * Sends the chat text to the server and clears the input field.
 */

function sendChatText() {
    let chatText = document.getElementById('message-input').value;
    chat1.emit('chat1', roomNo, name, chatText);
    document.getElementById('message-input').value = '';
}

/**
 * Connects the user to a chat room based on the selected options.
 */

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

/**
 * Loads the options for the second dropdown based on the selected category (Championship or Team).
 * @param {string} option - The selected category.
 */

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

/**
 * Writes a message to the chat history.
 * @param {string} text - The message text.
 * @param {string} messageClass - The CSS class to apply to the message.
 */

function writeOnChatHistory(text, messageClass) {
    let history = document.getElementById('chat_history');
    let paragraph = document.createElement('p');
    paragraph.className = messageClass;
    paragraph.innerHTML = text;
    history.appendChild(paragraph);

    history.scrollTop = history.scrollHeight - history.clientHeight; // Ensure scrolling to the bottom
    document.getElementById('message-input').value = '';
}

/**
 * Shows the second dropdown based on the selected value of the first dropdown.
 */

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

/**
 * Leaves the current chat room and resets the interface.
 */

function leaveRoom() {
    chat1.emit('leave', roomNo, name);
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';
    document.getElementById('chat_history').innerHTML = '';
    name = null;
    roomNo = null;
}

/**
 * Hides the login interface and shows the chat interface.
 * @param {string} room - The room ID.
 * @param {string} userId - The user ID.
 */

function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML = userId;
    document.getElementById('in_room').innerHTML = ' ' + room;
}
