let socket = new WebSocket("ws://localhost:8080/rwa/admin/quiz"); //WebSocket server za kviz

socket.onopen = function () {
    console.log("Connected to WebSocket server.");
};

socket.onmessage = function (event) {
    //obrada poruka od servera (pitanja, rezultati, status igre)
    const data = JSON.parse(event.data);
    if (data.type === "QUESTION") {
        displayQuestion(data.question);
    } else if (data.type === "RESULT") {
        handleResult(data.result);
    }
};

socket.onclose = function () {
    console.log("Disconnected from WebSocket server.");
};

socket.onerror = function (error) {
    console.error("WebSocket Error: " + error);
};

document.getElementById("submit-answer").addEventListener("click", function () {
    const answer = getSelectedAnswer(); //Pretpostavljamo funkciju koja vraća selektovani odgovor
    socket.send(JSON.stringify({ type: "ANSWER", answer: answer }));
});

function displayQuestion(question) {
    // Dinamički prikaz pitanja
}

function handleResult(result) {
    // Obrada rezultata i prikaz korisniku
}
