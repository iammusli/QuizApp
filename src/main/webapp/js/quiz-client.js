let quizPin;
let quizID;
let playerID;


let playerCount = 0;
const players = document.getElementById("players");

let questionText = "";
let question = null;
let answer1 = null;
let answer2 = null;
let answer3 = null;
let answer4 = null;
let selectedAnswer;



document.addEventListener('DOMContentLoaded', () => {
    question = document.getElementById("question-text");
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

    const socket = new WebSocket('ws://localhost:80/rwa/quiz/' + quizPin + '/' + quizID);

    socket.onopen = function(event) {
        console.log('Connected to quiz server.');
        var message = {
            content: "New player has joined!",
            type: "JOIN_ROOM",
            senderID: playerID,
            quizPIN: quizPin,
            adminAction: false
        }
        socket.send(JSON.stringify(message));
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        handleMessage(data);
    };

    socket.onclose = function(event) {
        console.log('Disconnected from quiz server.');
    };

    socket.onerror = function(event) {
        console.error('WebSocket error:', event);
    };

    function handleMessage(message) {
        switch (message.type) {
            case 'QUESTION_BROADCAST':
                questionText = message.content;
                question.textContent = questionText;
                break;
            case 'ANSWERS_BROADCAST':
                var answers = JSON.parse(message.content);
                displayAnswers(answers);
                break;
            case 'ANSWER_FEEDBACK':
                if(message.senderID === playerID){
                    var correct = message.content;
                    console.log("Answer is " + correct);
                    signalResult(correct);
                }
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

    function displayAnswers(answers){
        const optionsElem = document.getElementById('quiz-options');
        optionsElem.innerHTML = '';
        for(let i = 0; i < 4; ++i){
            const optionElem = document.createElement('button');
            optionElem.textContent = answers[i];
            optionElem.className = 'quiz-option';
            optionElem.addEventListener('click', () => handleOptionSelect(i));
            optionsElem.appendChild(optionElem);
        }
    }

    function handleOptionSelect(index){
        selectedAnswer = index;
        var msg = {
            content: index,
            type: "ANSWER_SUBMISSION",
            senderID: playerID,
            quizPIN: quizPin,
            adminAction: false
        }
        socket.send(JSON.stringify(msg));
        disableOptions();
    }

    function disableOptions() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.disabled = true;
            option.classList.add('disabled');
        });
    }

    function signalResult(result){
        const quizOptions = document.querySelectorAll('.quiz-option');
        if(result === "true"){
            quizOptions[selectedAnswer].setAttribute("style", "background-color: green");
        } else {
            quizOptions[selectedAnswer].setAttribute("style", "background-color: red");
        }
    }
});




