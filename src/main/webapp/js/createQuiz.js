

const quizName = document.getElementById("quiz-name");
const quizCategory = document.getElementById("quiz-category");
const cardName = document.getElementById("quiz-card-name");
const cardCategory = document.getElementById("quiz-card-category");
const createQuestion = document.getElementById("create-question-btn");
const createQuiz = document.getElementById("create-quiz-btn");
const questionContainer = document.querySelector(".question-container");
const questionNumber = document.getElementById("question-number");
var quizData;
var questions = document.querySelectorAll('.question-wrapper');
var arrows = document.querySelectorAll('.arrow');

arrows.forEach((arrow) => {
    arrow.addEventListener("click", function(event){
        event.stopPropagation();
        var answers = this.previousElementSibling;
        if(answers.classList.contains("selected")){
            answers.classList.remove("selected");
            arrow.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
        } else {
            answers.classList.add("selected");
            arrow.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon>';
        }
    });
});

quizName.addEventListener("input", function(e){
    cardName.textContent = e.target.value;
});
quizCategory.addEventListener("input", function(e){
    cardCategory.textContent = e.target.value;
});

createQuestion.addEventListener("click", function(){
    var question = document.createElement("div");
    question.classList.add("question-wrapper");
    question.innerHTML = '<div class="question">' +
        '<input type="text" class="question-input" placeholder="Quiz question text">' +
        '<button class="trash-button"><ion-icon class="trash" name="trash-outline"></ion-icon></button>' +
        '</div>' +
        '<div class="answers-wrapper">'+
        '<div class="answer">'+
        '<input type="text" class="answer-input" placeholder="Question answer text">'+
        '<input type="checkbox" class="correct">'+
        '</div>'+
        '<div class="answer">'+
        '<input type="text" class="answer-input" placeholder="Question answer text">'+
        '<input type="checkbox" class="correct">'+
        '</div>'+
        '<div class="answer">'+
        '<input type="text" class="answer-input" placeholder="Question answer text">'+
        '<input type="checkbox" class="correct">'+
        '</div>'+
        '<div class="answer">'+
        '<input type="text" class="answer-input" placeholder="Question answer text">'+
        '<input type="checkbox" class="correct">'+
        '</div>'+
        '</div>'+
        '<div class="arrow">'+
        '<ion-icon class="down-arrow" name="chevron-down-outline"></ion-icon>'+
        '</div>';
    questionContainer.appendChild(question);

    questionNumber.textContent = questionContainer.childElementCount + " questions";

    question.querySelector('.question-input').addEventListener('input', updateBackground);

    question.querySelector(".trash-button").addEventListener("click", function(){
        question.classList.add('fade-out');

        setTimeout(() => {
            questionContainer.removeChild(question);
            questionNumber.textContent = questionContainer.childElementCount + " questions";
        }, 500);

        console.log(questionContainer.childElementCount);
    });

    var answerInputs = question.querySelectorAll('.answer-input');
    answerInputs.forEach(input => {
        input.addEventListener('input', updateBackground);
    });

    var checkboxes = question.querySelectorAll('.correct');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBackground);
    });

    question.lastElementChild.addEventListener("click", function(event) {
        event.stopPropagation();
        var answers = this.previousElementSibling;
        if (answers.classList.contains("selected")) {
            answers.classList.remove("selected");
            this.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
        } else {
            answers.classList.add("selected");
            this.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon>';
        }
    });

    function updateBackground() {
        var filled = true;

        if (question.firstElementChild.firstElementChild.value === "") filled = false;

        var answers = question.querySelectorAll(".answer");
        answers.forEach((answer) => {
            if (answer.firstElementChild.value === "") filled = false;
        });

        var checkboxes = question.querySelectorAll('input[type="checkbox"]');
        if (![...checkboxes].some(checkbox => checkbox.checked)) filled = false;

        question.setAttribute("style", "background-color: " + (filled ? "var(--green)" : "var(--red)") + ";");

        return filled;
    }

    updateBackground();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/rwa/admin/quiz/empty", true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
    xhr.onload = function (){
        if(xhr.status !== 200){
            console.error(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            quizData = JSON.parse(xhr.responseText);
            console.log(quizData);
        }
    }
    xhr.onerror = function (){
        console.error("Request failed");
    };
});
