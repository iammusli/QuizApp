

document.addEventListener("DOMContentLoaded", function(){
    var jsonData = document.getElementById("jsonData").getAttribute("data-json");
    var quizData = JSON.parse(jsonData);
    console.log(quizData);


    var cancelBtn = document.getElementById("cancel-btn");
    var quizName = document.getElementById("quiz-name");
    var quizCategory = document.getElementById("quiz-category");
    var cardQuestionNumber = document.getElementById("quiz-card-question-number");
    var cardName = document.getElementById("quiz-card-name");
    var cardCategory = document.getElementById("quiz-card-category");
    var filled = false;

    cancelBtn.addEventListener("click", function(){
        window.location.href = "/rwa/admin/home";
    })

    quizName.value = quizData.title;
    quizCategory.value = quizData.category;

    cardName.textContent = quizData.title;
    cardQuestionNumber.textContent = quizData.questions.length + " questions";
    cardCategory.textContent = quizData.category;

    quizName.addEventListener("input", function(e){
        cardName.textContent = e.target.value;
    });
    quizCategory.addEventListener("input", function(e){
        cardCategory.textContent = e.target.value;
    });




    var createQuestionBtn = document.getElementById("create-question-btn");
    createQuestionBtn.addEventListener("click", function (){
        createQuestion();
    });
    var createQuizBtn = document.getElementById("create-quiz-btn");
    createQuizBtn.addEventListener('click', function (){
        createQuiz(quizData.id);
    });

    for(let i = 0; i < quizData.questions.length; i++){
        createQuestion(quizData.questions[i]);
    }
});

function createQuestion(questionData) {

    var questionContainer = document.querySelector(".question-container");
    var questionWrapper = document.createElement("div");
    var cardQuestionNumber = document.getElementById("quiz-card-question-number");
    questionWrapper.classList.add("question-wrapper");
    questionWrapper.classList.add("draggable");
    questionWrapper.setAttribute("draggable", "true");
    questionContainer.appendChild(questionWrapper);
    var question = document.createElement("div");
    question.classList.add("question");

    questionWrapper.appendChild(question);
    question.innerHTML = `<input type="text" class="question-input" placeholder="Quiz question text">
        <button class="trash-button"><ion-icon class="trash" name="trash-outline"></ion-icon></button>
        </div> 
        <div class="answers-wrapper">
        <div class="answer">
        <input type="text" class="answer-input" placeholder="Question answer text">
        <input type="checkbox" class="correct">
        </div>
        <div class="answer">
        <input type="text" class="answer-input" placeholder="Question answer text">
        <input type="checkbox" class="correct">
        </div>
        <div class="answer">
        <input type="text" class="answer-input" placeholder="Question answer text">
        <input type="checkbox" class="correct">
        </div>
        <div class="answer">
        <input type="text" class="answer-input" placeholder="Question answer text">
        <input type="checkbox" class="correct">
        </div>
        </div>
        <div class="arrow">
        <ion-icon class="down-arrow" name="chevron-down-outline"></ion-icon>`;



    questionWrapper.addEventListener("dragstart", function (event) {
        event.target.classList.add("dragging");
        event.dataTransfer.setData("text/plain", event.target.id);
    });

    questionWrapper.addEventListener("dragend", function (event) {
        event.target.classList.remove("dragging");
        [...questionContainer.querySelectorAll('.question-wrapper')].forEach(el => {
            el.style.transform = 'none';
        });
    });

    questionContainer.addEventListener("dragover", function (event) {
        event.preventDefault();
        const afterElement = getDragAfterElement(event.clientY);
        const draggable = document.querySelector('.dragging');
        const questionElements = [...questionContainer.querySelectorAll('.question-wrapper:not(.dragging)')];
        questionElements.forEach((element, index) => {
            const box = element.getBoundingClientRect();
            const offset = event.clientY - box.top - box.height / 2;

            if (offset > 0) {
                element.style.transform = `translateY(${draggable.offsetHeight}px)`;
            } else {
                element.style.transform = `translateY(0)`;
            }
        });
        if (afterElement == null) {
            questionContainer.appendChild(draggable);
        } else {
            questionContainer.insertBefore(draggable, afterElement);
        }
    });

    function getDragAfterElement(y) {
        const draggableElements = [...questionContainer.querySelectorAll('.question-wrapper:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }


    var questionText = question.querySelector(".question-input");
    var trashButton = question.querySelector(".trash-button");
    var answerInputs = question.querySelectorAll(".answer-input");
    var checkboxes = question.querySelectorAll(".correct");
    var arrow = question.querySelector('.arrow');


    questionText.addEventListener('input', updateBackground);
    cardQuestionNumber.textContent = questionContainer.childElementCount + " questions";

    arrow.addEventListener("click", function (event) {
        event.stopPropagation();
        var answers = this.previousElementSibling;
        if (answers.classList.contains("selected")) {
            answers.classList.remove("selected");
            arrow.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
        } else {
            answers.classList.add("selected");
            arrow.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon>';
        }
    });

    trashButton.addEventListener("click", function(){
        question.parentNode.classList.add('fade-out');

        setTimeout(() => {
            questionContainer.removeChild(question.parentNode);
            cardQuestionNumber.textContent = questionContainer.childElementCount + " questions";
        }, 500);
    });

    console.log(questionData);

    if(questionData === undefined){
        questionText.value = "";
        for(let i = 0; i < 4; ++i){
            answerInputs[i].addEventListener('input', updateBackground);
            checkboxes[i].addEventListener('change', updateBackground);
        }
    } else {
        questionText.value = questionData.question || "";
        for (let i = 0; i < 4; ++i) {
            answerInputs[i].value = questionData.answers[i].answer_text;
            checkboxes[i].checked = questionData.answers[i].correct;

            answerInputs[i].addEventListener('input', updateBackground);
            checkboxes[i].addEventListener('change', updateBackground);
        }
    }

    updateBackground();

    function updateBackground() {
        filled = true;

        if (question.firstElementChild.value === "") filled = false;

        var answers = question.querySelectorAll(".answer");
        answers.forEach((answer) => {
            if (answer.firstElementChild.value === "") filled = false;
        });

        var checkboxes = question.querySelectorAll('input[type="checkbox"]');
        if (![...checkboxes].some(checkbox => checkbox.checked)) filled = false;

        question.parentNode.setAttribute("style", "background-color: " + (filled ? "var(--green)" : "var(--red)") + ";");

        return filled;
    }
}

function createQuiz(id){
    var filled = true;
    var quizName = document.getElementById("quiz-name");
    var quizCategory = document.getElementById("quiz-category");
    var questions = document.querySelectorAll(".question-input");

    if(quizName.value === "") filled = false;
    if(quizCategory.value === "") filled = false;
    questions.forEach((question) => {
        if(question.value === "") filled = false;
    });
    var answers = document.querySelectorAll(".answer");
    answers.forEach((answer) => {
        if (answer.firstElementChild.value === "") filled = false;
    });

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (![...checkboxes].some(checkbox => checkbox.checked)) filled = false;
    if(filled){
        var quizName = document.getElementById("quiz-name");
        var quizCategory = document.getElementById("quiz-category");
        let QUIZ = new Quiz(quizName.value, quizCategory.value, []);

        var questionContainer = document.querySelector(".question-container");
        questions = questionContainer.querySelectorAll(".question-wrapper");

        for(let i = 0; i < questions.length; ++i){
            let answers = questions[i].querySelectorAll(".answer-input");
            let checkboxes = questions[i].querySelectorAll(".correct");
            QUIZ.addQuestion(new Question(60, 10,questions[i].firstElementChild.firstElementChild.value, []));
            for(let j = 0; j < 4; ++j){
                QUIZ.questions[i].addAnswer(new Answer(answers[j].value, checkboxes[j].checked ));
            }
        }
        let xhr = new XMLHttpRequest();
        let json = JSON.stringify(QUIZ);
        xhr.open("POST", "/rwa/admin/quizzes/edit", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function (){
            if(xhr.status !== 200){
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                window.location.href = "/rwa/admin/home";
            }
        }
        xhr.onerror = function (){
            console.error("Request failed");
        };
        xhr.send("quiz=" + json);
    } else {
        console.log("quiz not filled properly");
    }
}

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







