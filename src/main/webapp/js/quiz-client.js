let quizPin;
let quizID;
let playerID;

const questionElem = document.getElementById('question');
const optionsElem = document.getElementById('options');
const messageElem = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');
let currentQuestion = null;
let selectedAnswer = null;

const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const quizTimer = document.querySelector('.quiz-timer');
const quizQuestion = document.querySelector('.quiz-question');

const hr = 0;
const min = 0;
const sec = 10;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;

let setTime = hours + minutes + seconds;
let startTime = Date.now();
let futureTime = startTime + setTime;

let timerLoop = setInterval(countDownTimer);
countDownTimer();

// Centriranje timera (NE CACKATI!)
function adjustTimerPosition() {
    const quizQuestionRect = quizQuestion.getBoundingClientRect();
    const quizCardRect = document.querySelector('.quiz-card').getBoundingClientRect();

    const quizQuestionCenter = (quizQuestionRect.top + quizQuestionRect.bottom) / 2;

    quizTimer.style.top = `${quizQuestionCenter - quizCardRect.top - (quizTimer.offsetHeight / 2)}px`;
}
//za timer
function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    if (angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const secs = Math.floor((remainingTime / (1000)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    timer.innerHTML = `${mins}:${secs}`;

    if (remainingTime < 0) {
        clearInterval(timerLoop);
        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.disabled = true;
            option.classList.add('disabled');
        });
        setTimeout(loadNextQuestion, 2000);
    }

    adjustTimerPosition();
}
adjustTimerPosition();

document.addEventListener('DOMContentLoaded', () => {
    quizID = document.getElementById('quiz-id').value;
    quizPin = document.getElementById('quiz-pin').value;

    playerID = '<%= request.getAttribute("playerID") != null ? request.getAttribute("playerID") : "" %>';

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
        socket.send(JSON.stringify({ playerID: playerID }));
    };

    socket.onmessage = function(event) {
        //const message = JSON.parse(event.data);//parsira pitanja i opcije
        //handleServerMessage(message);
        const data = JSON.parse(event.data);
        if (data.type === 'QUESTION_BROADCAST') {
            displayQuestion(data);
        }
    };

    socket.onclose = function(event) {
        console.log('Disconnected from quiz server.');
    };

    socket.onerror = function(event) {
        console.error('WebSocket error:', event);
    };
});

// Handle incoming messages from the server
/*
function handleServerMessage(message) {
    switch (message.type) {
        case 'QUESTION_BROADCAST':
            displayQuestion(message.content);//question data
            break;
        case 'END_QUIZ':
            displayResults();
            break;
        case 'CHAT_MESSAGE':
            displayMessage(message.content);
            break;
        case 'ERROR':
            displayMessage(message.content);
            break;
        default:
            console.warn('Unknown message type:', message.type);
    }
}
*/
//ono sto je na onmessage pokupio kao datu od servera
function displayQuestion(data) {
    const questionElement = document.getElementById('question-text');
    const optionsElement = document.getElementById('quiz-options');

    questionElement.innerText = data.question;//prikazi pitanje

    //opcije
    optionsElement.innerHTML = '';//ocisti prethodne

    data.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');

        //dodavanje funkcionalnosti kada se klikne na opciju
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });
    resetTimer();
    startTimer();
}

// Handle answer selection
function selectOption(selectedIndex) {
    const answer = {
        //obj za slanje odabrane opcije
        type: 'ANSWER',
        selectedOption: selectedIndex
    };
    socket.send(JSON.stringify(answer));
    console.log(`Selected option: ${selectedIndex}`);//prikaz za  korisnikz
    disableOptions();
}

function disableOptions() {
    const quizOptions = document.querySelectorAll('.option-button');
    quizOptions.forEach(option => {
        option.disabled = true;
        option.classList.add('disabled');
    });
}

function resetTimer() {
    setTime = sec * 1000;
    //setTime = question.seconds * 1000;

    startTime = Date.now();
    futureTime = startTime + setTime;
    if (timerLoop) {
        clearInterval(timerLoop);
    }
    semicircles[0].style.display = 'block';
    semicircles[1].style.display = 'block';
    semicircles[2].style.display = 'none';
    semicircles[0].style.transform = 'rotate(0deg)';
    semicircles[1].style.transform = 'rotate(0deg)';
    timerLoop = setInterval(countDownTimer);
    countDownTimer();
}
function startTimer() {
    semicircles[0].style.display = 'block';
    semicircles[1].style.display = 'block';
    semicircles[2].style.display = 'none';
    semicircles[0].style.transform = 'rotate(0deg)';
    semicircles[1].style.transform = 'rotate(0deg)';
    timerLoop = setInterval(countDownTimer);
    countDownTimer();
}