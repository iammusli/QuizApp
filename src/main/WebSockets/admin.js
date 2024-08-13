document.addEventListener("DOMContentLoaded", function () {
    const socket = new WebSocket("ws://localhost:8080/rwa/admin/quiz");

    socket.onopen = function () {
        console.log("Connected to WebSocket server.");
    };

    socket.onclose = function () {
        console.log("Disconnected from WebSocket server.");
    };

    socket.onerror = function (error) {
        console.error("WebSocket Error: " + error);
    };

    //slanje novog pina
    const sendPinButton = document.getElementById("send-pin-button");
    const pinInput = document.getElementById("pin-input");

    sendPinButton.addEventListener("click", function () {
        const newPin = pinInput.value.trim();
        if (newPin.length === 4 && /^[0-9]+$/.test(newPin)) {
            console.log("Sending new PIN: " + newPin);
            socket.send("SEND_PIN:" + newPin); //pin se salje serveru
            alert("PIN sent successfully: " + newPin);
        } else {
            alert("Please enter a valid 4-digit PIN.");
        }
    });
});
