

const quizName = document.getElementById("quiz-name");
const quizCategory = document.getElementById("quiz-category");
const cardName = document.getElementById("quiz-card-name");
const cardCategory = document.getElementById("quiz-card-category");
const createQuestion = document.getElementById("create-question-btn");
const createQuiz = document.getElementById("create-quiz-btn");
const questionContainer = document.querySelector(".question-container");
const questionNumber = document.getElementById("question-number");
var filled = false;
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
        filled = true;

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
});

createQuiz.addEventListener("click", function(){
    if(filled){
        var QUIZ = new Quiz(quizName.value, quizCategory.value, []);

        questions = questionContainer.querySelectorAll(".question-wrapper");

        for(var i = 0; i < questions.length; ++i){
            var answers = questions[i].querySelectorAll(".answer-input");
            var checkboxes = questions[i].querySelectorAll(".correct");
            QUIZ.addQuestion(new Question(60, 10,questions[i].firstElementChild.firstElementChild.value, []));
            for(var j = 0; j < 4; ++j){
                QUIZ.questions[i].addAnswer(new Answer(answers[j].value, checkboxes[j].checked ));
            }
        }
        var xhr = new XMLHttpRequest();
        var json = JSON.stringify(QUIZ);
        xhr.open("POST", "/rwa/admin/quizzes/create", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function (){
            if(xhr.status !== 200){
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {

            }
        }
        xhr.onerror = function (){
            console.error("Request failed");
        };
        xhr.send("quiz=" + json);
    } else {
        console.log("quiz not filled properly");
    }
})

function Quiz(title, category ,questions){
    this.title = title;
    this.category = category;
    this.questions = questions;
}

Quiz.prototype.addQuestion = function(question){
    this.questions.push(question);
}

function Question(seconds, points, question, answers){
    this.seconds = seconds;
    this.points = points;
    this.question = question;
    this.answers = answers;
}

Question.prototype.addAnswer = function(answer){
    this.answers.push(answer);
}

function Answer(answer_text, correct){
    this.answer_text = answer_text;
    this.correct = correct;
}

function User(id, username, isAdmin){
    this.id = id;
    this.username = username;
    this.isAdmin = isAdmin;
}



