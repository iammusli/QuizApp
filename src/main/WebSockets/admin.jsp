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
        let pinMap = new Map();

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
            getUsername().then(username => {
                let pin = generateUniquePin(username);
                socket.send("PIN:" + pin);
                console.log("Sent PIN to clients: " + pin);
            }).catch(error => {
                console.error("Error retrieving username:", error);
            });
        });

        function generatePin() {
            let pin;
            while(true){
                pin = Math.floor(1000 + Math.random() * 9000).toString();
                if (!pinMap.get(pin)) {
                    break;
            }
        }
            pinMap.set(pin, username);
            return pin;
        }
        async function getUsername() {
            try {
                const response = await fetch("/rwa/admin/settings", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                return data.username;
            } catch (error) {
                console.error("Failed to fetch username:", error);
                throw error;
            }
        }
    </script>
</body>
</html>
