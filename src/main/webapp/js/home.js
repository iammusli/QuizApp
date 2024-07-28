
const list = document.querySelectorAll('.list');
function activeLink(){
    list.forEach((item) => {
        item.classList.remove('active');
    });
    this.classList.add('active');
}
list.forEach((item) => {
    item.addEventListener('click', activeLink);
});

const cards = document.querySelectorAll('.card');
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
    }


}
cards.forEach((item) => {
    item.addEventListener('click', selectCard);
});

