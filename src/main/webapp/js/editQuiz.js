

window.onload = function(){
    var jsonData = document.getElementById("jsonData").getAttribute("data-json");
    var quizData = JSON.parse(jsonData);
    console.log(quizData);


    var quizName = document.getElementById("quiz-name");
    var quizCategory = document.getElementById("quiz-category");
    var cardQuestionNumber = document.getElementById("quiz-card-question-number");
    var cardName = document.getElementById("quiz-card-name");
    var cardCategory = document.getElementById("quiz-card-category");
    var filled = false;

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


    var questionContainer = document.querySelector(".question-container");

    var createQuestionBtn = document.getElementById("create-question-btn");
    createQuestionBtn.addEventListener("click", createQuestion);

    for(let i = 0; i < quizData.questions.length; ++i){
        createQuestion(quizData.questions[i]);
    }


    function createQuestion(questionData) {
        var questionWrapper = document.createElement("div");
        questionWrapper.classList.add("question-wrapper");
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

        var questionText = question.querySelector(".question-input");
        var trashButton = question.querySelector(".trash-button");
        var answerInputs = question.querySelectorAll(".answer-input");
        var checkboxes = question.querySelectorAll(".correct");
        var arrow = question.querySelector('.arrow');



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
                questionNumber.textContent = questionContainer.childElementCount + " questions";
            }, 500);
        });

        if(arguments.length !== 0){
            questionText.value = questionData.question;
            for (let i = 0; i < answerInputs.length; ++i) {
                answerInputs[i].value = questionData.answers[i].answer_text;
                checkboxes[i].checked = questionData.answers[i].correct;
            }
        }
    }
}






