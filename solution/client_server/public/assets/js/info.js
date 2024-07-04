
/**
 * Handles sending a message. Resets the form and displays a success alert.
 * @async
 * @function handleSendMessage
 * @returns {Promise<void>}
 */

async function handleSendMessage() {
        document.getElementById('msg_form').reset();
        alert("Il messaggio è stato inviato con successo! Risponderemo il prima possibile");
    }