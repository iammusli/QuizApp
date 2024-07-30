
const list = document.querySelectorAll('.list');
function activeLink(){
    list.forEach((item) => {
        item.classList.remove('active');
    });
    this.classList.add('active');
    let content = document.querySelector(".content");
    if(this.id !== "quizzes")
        content.innerHTML = "";
}
list.forEach((item) => {
    item.addEventListener('click', activeLink);
});


