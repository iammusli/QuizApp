const quizData = {
    id: "1",
    category: "Quiz category",
    name: "Quiz name",
    questions: "10"
};

var cards = document.querySelectorAll('.card');

document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("quizzes").addEventListener("click", function (){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/rwa/admin/quizzes", true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
        xhr.onload = function (){
            if(xhr.status !== 200){
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                var content = document.querySelector(".content");
                console.log(data.length);
                for(var i = 0; i < data.length; ++i){
                    quizData.id = data[i].id;
                    quizData.name = data[i].title;
                    quizData.questions = data[i].questions.length;
                    content.appendChild(makeQuizCard(quizData));
                }
            }
        }
        xhr.onerror = function (){
            console.error("Request failed");
        };
    });
});

function makeQuizCard(quizData) {
    var box = document.createElement("div");
    box.classList.add("box");

    var card = document.createElement("div");
    card.classList.add("card");
    card.id = quizData.id;
    card.addEventListener('click', selectCard);

    var front = document.createElement("div");
    front.classList.add("front");

    var quizCategory = document.createElement("div");
    quizCategory.classList.add("quiz-category");

    var quizCategoryText = document.createElement("h3");
    quizCategoryText.classList.add("quiz-category");
    quizCategoryText.textContent = quizData.category;

    var picDiv = document.createElement("div");
    var pic = document.createElement("img");
    pic.classList.add("quiz-picture");
    pic.src = "../assets/background1.jpg";

    var quizDetails = document.createElement("div");
    quizDetails.classList.add("quiz-details");

    var quizName = document.createElement("h3");
    quizName.classList.add("quiz-name");
    quizName.textContent = quizData.name;

    var questionNumber = document.createElement("h5");
    questionNumber.classList.add("question-number");
    questionNumber.textContent = quizData.questions + " questions";
    var back = document.createElement("div");
    back.classList.add("back");

    var buttonPlay = document.createElement("button");
    buttonPlay.classList.add("card-button");
    buttonPlay.textContent = "Play";
    var buttonEdit = document.createElement("button");
    buttonEdit.classList.add("card-button");
    var buttonDelete = document.createElement("button");
    buttonDelete.classList.add("card-button");
    buttonDelete.textContent = "Delete";

    buttonPlay.addEventListener("click", function(){
       console.log("Play quiz");
        window.href = "/rwa/play?quizID=" + quizData.id;
    });
    buttonEdit.addEventListener("click", function(){
        console.log("Edit quiz");
        window.href = "/rwa/admin/quizzes/edit?quizID=" + quizData.id;
    });
    buttonDelete.addEventListener("click", function() {
        var id = this.parentElement.parentElement.id;
        console.log("Delete quiz " + id);

        fetch(`/rwa/admin/quizzes/delete?quizId=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then(data => {
                console.log("Quiz deleted successfully.", data);
                var box = this.parentElement.parentElement.parentElement;
                box.parentElement.removeChild(box);
            })
            .catch(error => {
                console.error("Request failed:", error);
                // Optionally, show an error message to the user
            });
    });

    var linkEdit = document.createElement("a");
    linkEdit.href = "/rwa/admin/quizzes/edit?quizID=" + quizData.id;
    linkEdit.textContent = "Edit";

    box.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    front.appendChild(quizCategory);
    quizCategory.appendChild(quizCategoryText);
    front.appendChild(picDiv);
    picDiv.appendChild(pic);
    front.appendChild(quizDetails);
    quizDetails.appendChild(quizName);
    quizDetails.appendChild(questionNumber);
    back.appendChild(buttonPlay);
    back.appendChild(buttonEdit);
    back.appendChild(buttonDelete);
    buttonEdit.appendChild(linkEdit);

    return box;
}

function selectCard(){
    if(this.classList.contains('selected')){
        cards.forEach((item) => {
            item.classList.remove('selected');
        });
    } else {
        cards.forEach((item) => {
            item.classList.remove('selected');
        });
        this.classList.add('selected');
        quizData.id = this.id;
    }
    cards = document.querySelectorAll(".card");
}
