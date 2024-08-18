const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const quizTimer = document.querySelector('.quiz-timer');
const quizQuestion = document.querySelector('.quiz-question');

let currentQuestionIndex = 0;
let questions = [];
let totalCorrectAnswers = 0;
let totalIncorrectAnswers = 0;
let totalScore = 0;


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

function broadcastQuestion(question) {
    const message = {
        type: 'QUESTION_BROADCAST',
        content: question.question,
        options: question.answers.map(answer => answer.answer_text)
    };
    socket.send(JSON.stringify(message));
}

function handleWebSocketMessages() {
    const socket = new WebSocket(`ws://localhost:8080/quiz/${quizPin}/${quizID}`);

    socket.onopen = function() {
        console.log("WebSocket connection opened.");
    };

    socket.onmessage = function(event) {
        const message = JSON.parse(event.data);

        switch (message.type) {
            case 'ANSWER_SUBMISSION':
                handleAnswerSubmission(message);
                break;
            case 'SKIP_QUESTION':
                handleSkipQuestion();
                break;
            case 'END_QUIZ':
                handleEndQuiz();
                break;
        }
    };

    socket.onclose = function() {
        console.log("WebSocket connection closed.");
    };

    socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
}

function handleAnswerSubmission(message) {
    console.log(`Received answer from ${message.senderID}: ${message.content}`);
    // Process the answer as needed
}
function handleSkipQuestion() {
    console.log("Question skipped.");
    loadNextQuestion();
}
function handleEndQuiz() {
    console.log("Quiz ended.");
    // Handle end-of-quiz operations
}
// Centriranje timera (NE CACKATI!)
function adjustTimerPosition() {
    const quizQuestionRect = quizQuestion.getBoundingClientRect();
    const quizCardRect = document.querySelector('.quiz-card').getBoundingClientRect();

    const quizQuestionCenter = (quizQuestionRect.top + quizQuestionRect.bottom) / 2;

    quizTimer.style.top = `${quizQuestionCenter - quizCardRect.top - (quizTimer.offsetHeight / 2)}px`;
}
handleWebSocketMessages();
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

function loadQuestion(index) {
    console.log(`Loading question ${index}`);

    if (index < questions.length) {
        const question = questions[index];

        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.classList.remove('active');
        });

        document.getElementById('question-text').textContent = question.question;
        document.getElementById('points').textContent = `${question.points} Points`;
        document.getElementById('current-question-number').textContent = index + 1;

        const quizOptionsContainer = document.getElementById('quiz-options');
        quizOptionsContainer.innerHTML = '';
        question.answers.forEach((answer) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = answer.answer_text;
            quizOptionsContainer.appendChild(button);
        });
        broadcastQuestion(question);
        const newQuizOptions = document.querySelectorAll('.quiz-option');
        newQuizOptions.forEach(option => {
            option.addEventListener('click', handleOptionClick);
        });

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
    } else {
        console.log('No more questions');
    }

}

function loadNextQuestion() {
    const skipMessage = {
        type: 'SKIP_QUESTION',
        content: 'Admin has skipped the question.',
        senderID: 'admin',
        quizPIN: quizPin
    };
    socket.send(JSON.stringify(skipMessage));

    checkAnswers();
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        const nextQuestionButton = document.getElementById('next-question');
        nextQuestionButton.textContent = "Finish";
        nextQuestionButton.onclick = function() {
            startTime = Date.now();
            futureTime = startTime + setTime;
            if (timerLoop) {
                clearInterval(timerLoop);
            }
            semicircles[0].style.display = 'none';
            semicircles[1].style.display = 'none';
            semicircles[2].style.display = 'none';
            semicircles[0].style.transform = 'rotate(0deg)';
            semicircles[1].style.transform = 'rotate(0deg)';
            displayResults(totalCorrectAnswers, totalIncorrectAnswers);
        };
        return;
    }
    loadQuestion(currentQuestionIndex);
}

function displayResults(correctCount, incorrectCount) {
    const resultsPopup = document.getElementById('results-popup');
    const correctAnswersPopup = document.getElementById('correct-answers-popup');
    const incorrectAnswersPopup = document.getElementById('incorrect-answers-popup');
    const scorePopup = document.getElementById('score-popup');

    correctAnswersPopup.textContent = `Correct answers: ${correctCount}`;
    incorrectAnswersPopup.textContent = `Incorrect answers: ${incorrectCount}`;
    scorePopup.textContent = `Total score: ${totalScore} Points`;

    resultsPopup.style.display = 'flex';
}

function goBack() {
    window.location.href = "http://localhost/rwa/";
}

function initializeQuiz() {
    console.log("Initializing quiz.");
    if (window.quizData && window.quizData.questions) {
        questions = window.quizData.questions;
        console.log("Loaded questions:", questions);
        loadQuestion(currentQuestionIndex);
    } else {
        console.error("Questions data is not available.");
    }
}

function handleOptionClick(event) {
    const clickedButton = event.currentTarget;
    if (clickedButton.classList.contains('active')) {
        clickedButton.classList.remove('active');
    } else {
        clickedButton.classList.add('active');
    }
}

function checkAnswers() {
    const question = questions[currentQuestionIndex];
    const selectedOptions = [];
    const quizOptions = document.querySelectorAll('.quiz-option.active');

    quizOptions.forEach(option => {
        selectedOptions.push(option.textContent.trim());
    });

    const correctAnswers = question.answers.filter(answer => answer.correct).map(answer => answer.answer_text.trim());
    let isCorrect = selectedOptions.length === correctAnswers.length;

    for (let selected of selectedOptions) {
        if (!correctAnswers.includes(selected)) {
            isCorrect = false;
            break;
        }
    }

    for (let answer of question.answers) {
        if (!answer.correct && selectedOptions.includes(answer.answer_text.trim())) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        totalCorrectAnswers++;
        totalScore += question.points;
    } else {
        totalIncorrectAnswers++;
    }
    return isCorrect;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is loaded and DOM is ready.");

    questions = quizData.questions || [];
    console.log("Loaded questions:", questions);

    if (questions.length > 0) {
        loadQuestion(currentQuestionIndex);
    }

    const nextQuestionButton = document.getElementById('next-question');
    if (nextQuestionButton) {
        console.log("Next Question button found.");

        nextQuestionButton.addEventListener('click', loadQuestion);
    } else {
        console.error('Next Question button not found.');
    }
});
