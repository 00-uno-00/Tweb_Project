document.addEventListener("DOMContentLoaded", function() {
    var messageDiv = document.querySelector(".type-message");
    var writeMessage = document.querySelector(".write-message");

    messageDiv.addEventListener("focus", function() {var textLength = messageDiv.innerText.trim().length;
        if (textLength > 0) {
            writeMessage.style.display = "none"; // Nasconde il testo "Scrivi un messaggio..." se l'utente ha iniziato a scrivere
            messageDiv.style.color = "#000"; // Cambia il colore del testo a nero quando l'utente inizia a scrivere
        } else {
            writeMessage.style.display = "block"; // Riporta il testo "Scrivi un messaggio..." se l'utente non ha scritto nulla
            messageDiv.style.color = "#ccc"; // Cambia il colore del testo a grigio se l'utente non ha scritto nulla
        }
    });
});
