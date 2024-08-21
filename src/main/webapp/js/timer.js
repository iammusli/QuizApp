
let quizPin;
let quizID;
let playerID;
let playerCount = 0;
let questionText = "";
let answer1Text = "";
let answer2Text = "";
let answer3Text = "";
let answer4Text = "";
let buttonStart;
let buttonSkip;
let buttonEnd;
const players = document.getElementById("player-count");
let question = null;
let answer1 = null;
let answer2 = null;
let answer3 = null;
let answer4 = null;

function handleMessage(message) {
    switch (message.type) {
        case 'QUESTION_BROADCAST':
            questionText = message.content;
            question.textContent = questionText;
            break;
        case 'ANSWERS_BROADCAST':
            var answers = JSON.parse(message.content);
            answer1Text = answers[0];
            answer2Text = answers[1];
            answer3Text = answers[2];
            answer4Text = answers[3];
            answer1.textContent = answer1Text;
            answer2.textContent = answer2Text;
            answer3.textContent = answer3Text;
            answer4.textContent = answer4Text;
            break;
        case 'CHAT_MESSAGE':
            if(message.senderID !== playerID)
                console.log(message.senderID + ": " + message.content);
            break;
        case 'JOIN_ROOM' :
            if(message.senderID !== playerID)
                console.log(message.content + message.senderID);
            break;
        case 'PLAYER_COUNT':
            playerCount = message.content;
            players.textContent = playerCount;
            break;
        case 'LEAVE_ROOM':
            playerCount--;
            players.textContent = playerCount;
            break;
        default:
            console.log('Unknown message type:', message.type);
            break;
    }
}











document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is loaded and DOM is ready.");



    question = document.getElementById("question-text");
    answer1 = document.getElementById("answer-text-1");
    answer2 = document.getElementById("answer-text-2");
    answer3 = document.getElementById("answer-text-3");
    answer4 = document.getElementById("answer-text-4");


    quizID = document.getElementById('quiz-id').value;
    quizPin = document.getElementById('quiz-pin').value;
    var pid = document.getElementById('player-id')
    if( pid !== null ){
        playerID = pid.value;
    }
    if (!playerID) {
        playerID = prompt("Please enter your username:");
        if (!playerID) {
            alert("Username is required to join the quiz.");
            return;  // Zaustavlja izvršenje ako nije unesen username
        }
    }

    const socket = new WebSocket(`ws://localhost:80/rwa/quiz/${quizPin}/${quizID}`);

    socket.onopen = function(event) {
        console.log('WebSocket connection established.');
        var message = {
            content: "New player has joined the room!",
            type: "JOIN_ROOM",
            senderID: playerID,
            quizPIN: quizPin,
            adminAction: false
        }
        console.log(message);
        socket.send(JSON.stringify(message));
    };

    socket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        handleMessage(message);
    };

    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };

    socket.onclose = function(event) {
        console.log('WebSocket connection closed.');
    };

    buttonStart = document.getElementById("start");
    buttonStart.addEventListener("click", function (){
        var msg = {
            content: "Start quiz",
            type: "START_QUIZ",
            senderID: playerID,
            quizPIN: quizPin,
            adminAction: true
        };
        socket.send(JSON.stringify(msg));
        buttonStart.disabled = true;
        buttonStart.classList.add("disabled");
    });
    buttonSkip = document.getElementById("skip");
    buttonSkip.addEventListener("click", function (){
        var msg = {
            content: "Skip question",
            type: "SKIP_QUESTION",
            senderID: playerID,
            quizPIN: quizPin,
            adminAction: true
        };
        socket.send(JSON.stringify(msg));
    });
    buttonEnd = document.getElementById("end");
    buttonEnd.addEventListener("click", function (){
        var msg = {
            content: "End quiz",
            type: "END_QUIZ",
            senderID: playerID,
            quizPIN: quizPin,
            adminAction: true
        };
        socket.send(JSON.stringify(msg));
    });
});