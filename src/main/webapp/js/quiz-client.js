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
            displayQuestion(message.content);
            break;
        case 'CHAT_MESSAGE':
        case 'ERROR':
            displayMessage(message.content);
            break;
        default:
            console.warn('Unknown message type:', message.type);
    }
}

// Display the current question and options
function displayQuestion(questionText) {
    messageElem.textContent = '';
    questionElem.textContent = questionText;

    // Assuming currentQuestion is an object with options like:
    // { content: "Question?", options: ["A", "B", "C", "D"] }
    currentQuestion = {
        content: questionText,
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] // Example options
    };

    optionsElem.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', () => selectAnswer(option));
        optionsElem.appendChild(li);
    });

    submitBtn.disabled = true;
}

// Handle answer selection
function selectAnswer(answer) {
    selectedAnswer = answer;
    submitBtn.disabled = false;
}

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
        senderId: playerId,
        quizPin: quizPin
    };
    socket.send(JSON.stringify(answerMessage));
    submitBtn.disabled = true;
    displayMessage('Answer submitted.');
}

// Display a message to the user
function displayMessage(message) {
    messageElem.textContent = message;
}
