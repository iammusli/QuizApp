const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const quizTimer = document.querySelector('.quiz-timer');
const quizQuestion = document.querySelector('.quiz-question');

let currentQuestionIndex = 0;
let questions = []; //sadrzi sva pitanja iz quizDTO
//funkcija koja se poziva kada se klikne na opciju - unutar funkcije loadquestion
function handleOptionClick(event) {
    const clickedButton = event.currentTarget;//sama prepoznaje koji je button u pitanju
    //ako je button vec active, ukloni klasu active
    if (clickedButton.classList.contains('active')) {
        clickedButton.classList.remove('active');
    } else {
        //ako nije, dodaj klasu active na button
        clickedButton.classList.add('active');
    }
}

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
    }

    adjustTimerPosition();
}
adjustTimerPosition();
//ucitavanje i prikazivanje novog pitanja na osnovu indexa
function loadQuestion(index) {
    console.log(`Loading question ${index}`);
    if (index < questions.length) {
        const question = questions[index];

        //postavljanje novog pitanja
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('points').textContent = `${question.points} Points`;
        document.getElementById('current-question-number').textContent = index + 1;

        //postavljanje odgovora i dodavanje buttona
        const quizOptionsContainer = document.getElementById('quiz-options');
        quizOptionsContainer.innerHTML = ''; //cisti prethodne odgovore
        question.answers.forEach((answer) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = answer.answer_text;
            quizOptionsContainer.appendChild(button);
        });

        //dodaj event listener za nove odgovore
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.addEventListener('click', handleOptionClick);
        });

        //resetovanje timera
        setTime = question.seconds * 1000;
        startTime = Date.now();
        futureTime = startTime + setTime;

        if (timerLoop) {
            clearInterval(timerLoop);
        }
        timerLoop = setInterval(countDownTimer);
        countDownTimer();
    } else {
        console.log('No more questions');
    }
}
//koristi se za prelazak na sljedece pitanje
function loadNextQuestion() {
    console.log('Next Question button clicked');
    //ako nije posljednje pitanje u nizu onda povecava index i ucitava sljedece pitanje
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        console.log('No more questions to load');
    }
}
function initializeQuiz() {
    console.log("Initializing quiz.");
    questions = window.quizData.questions;
    console.log("Loaded questions:", questions);
    loadQuestion(currentQuestionIndex);
}

//izvrsava se kada je doc ucitan i parsiran - kada su svi elementi dostupni za interakciju
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is loaded and DOM is ready.");

    questions = window.quizData.questions;
    console.log("Loaded questions:", questions);
    loadQuestion(currentQuestionIndex);
//pitanja ucitana sa servera i postavljeno trenutno pitanje

    //dodaje event listener na Next Question button
    const nextQuestionButton = document.getElementById('next-question');
    if (nextQuestionButton) {
        console.log("Next Question button found.");
        nextQuestionButton.addEventListener('click', loadNextQuestion);
    } else {
        console.error('Next Question button not found.');
    }
});
