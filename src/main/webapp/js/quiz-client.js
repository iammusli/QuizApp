const quizPin = prompt("Enter Quiz Pin:");
const quizID = prompt("Enter Quiz ID:");
const playerId = prompt("Enter your Player ID:");

const socket = new WebSocket(`ws://localhost:8080/quiz/${quizPin}/${quizID}`);

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


// WebSocket event listeners
socket.onopen = function(event) {
    console.log('Connected to quiz server.');
};

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    handleServerMessage(message);
};

socket.onclose = function(event) {
    console.log('Disconnected from quiz server.');
};

socket.onerror = function(event) {
    console.error('WebSocket error:', event);
};

// Handle incoming messages from the server
function handleServerMessage(message) {
    switch (message.type) {
        case 'QUESTION_BROADCAST':
            displayQuestion(message);
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

// Display the current question and options
function displayQuestion(message) {
   //loadQuestion(question) - proslijedi se question umjesto message
    console.log('Displaying question:', message);
    const { content: questionText, options } = message;
    const questionElem = document.getElementById('question-text');
    const optionsElem = document.getElementById('quiz-options');
    const submitBtn = document.getElementById('submit-btn');

    questionElem.textContent = questionText;
    optionsElem.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsElem.appendChild(button);
    });

    submitBtn.disabled = true;

    resetTimer();
    startTimer();
}


// Handle answer selection
function selectAnswer(answer) {
    selectedAnswer = answer;
    document.getElementById('submit-btn').disabled = false;
}
document.getElementById('submit-btn').addEventListener('click', function() {
    if (selectedAnswer) {
        sendAnswer(selectedAnswer);
    }
});
// Handle answer submission
submitBtn.addEventListener('click', function() {
    if (selectedAnswer && currentQuestion) {
        sendAnswer(selectedAnswer);
    }
});

// Send the selected answer to the server
function sendAnswer(answer) {
    const answerMessage = {
        type: 'ANSWER_SUBMISSION',
        content: answer,
        senderID: playerId,
        quizPIN: quizPin,
        adminAction: false
    };
    socket.send(JSON.stringify(answerMessage));
    document.getElementById('submit-btn').disabled = true;
    displayMessage('Answer submitted.');
}

// Display a message to the user
function displayMessage(message) {
    messageElem.textContent = message;
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