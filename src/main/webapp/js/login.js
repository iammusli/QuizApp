
var FORM = document.getElementById("login-form");
var username = document.getElementById("username");
var password = document.getElementById("password");
var note = document.getElementById("form-text");

FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    login();
});

function login(){
    if(validateLogin()){
        FORM.submit();
    }
}

function validateLogin(){
    var error = false;

    if(username.value.trim() === "") {
        error = true;
        username.setAttribute("style" , "border: 2px solid #CD0404");
    }
    if(password.value.trim() === "") {
        error = true;
        password.setAttribute("style", "border: 2px solid #CD0404");
    }
    return !error;
}

