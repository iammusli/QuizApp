
const list = document.querySelectorAll('.list');
var nav = document.querySelector(".nav-wrapper");
var div1 = document.createElement("div");
var div2 = document.createElement("div");
function activeLink(){
    list.forEach((item) => {
        item.classList.remove('active');
    });
    this.classList.add('active');
    let content = document.querySelector(".content");
    if(this.id !== "quizzes"){
        content.innerHTML = "";
        if(nav.contains(div1)){
            nav.removeChild(div1);
            nav.removeChild(div2);
        }
    }
    else {
        div1.classList.add("create-quiz-btn");
        div1.innerHTML = '<a href="/rwa/admin/quizzes/create"><ion-icon name="add-outline"></ion-icon></a>';
        div2.classList.add("create-quiz-btn-decoy");
        nav.insertBefore(div1, nav.firstChild);
        nav.appendChild(div2);
    }
}
list.forEach((item) => {
    item.addEventListener('click', activeLink);
});


