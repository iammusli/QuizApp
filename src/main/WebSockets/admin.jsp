<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Page</title>
</head>
<body>
    <h1>Admin Page</h1>
    <button id="send-pin-button">Send PIN to Players</button>
    <script>
        const socket = new WebSocket("ws://localhost:8080/rwa/admin/quiz");
        const sendPinButton = document.getElementById("send-pin-button");

        socket.onopen = function () {
            console.log("Connected to WebSocket server.");
        };

        socket.onmessage = function (event) {
            console.log("Received data: " + event.data);
        };

        socket.onclose = function () {
            console.log("Disconnected from WebSocket server.");
        };

        socket.onerror = function (error) {
            console.error("WebSocket Error: " + error);
        };

        sendPinButton.addEventListener("click", function () {
            let pin = generatePin();
            socket.send("PIN:" + pin);
            console.log("Sent PIN to clients: " + pin);
        });

        function generatePin() {
            //neka funkcija za generisanje pina
        }
    </script>
</body>
</html>
