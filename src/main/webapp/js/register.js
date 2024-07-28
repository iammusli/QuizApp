


var username = document.getElementById("username");
var password = document.getElementById("password");
var cpassword = document.getElementById("cpassword");
var FORM = document.getElementById("login-form");


FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    register();
});

username.addEventListener("keyup", ()=> {
    if(username.value.trim() === "") {
        username.setAttribute("style", "background-color: #FF0032;" +
            " border: 2px solid #CD0404");
    } else {
        username.removeAttribute("style");
    }
});
password.addEventListener("keyup", ()=> {
    if(password.value.trim() === "") {
        password.setAttribute("style", "background-color: #FF0032;" +
            " border: 2px solid #CD0404");
    } else {
        password.removeAttribute("style");
    }
});
cpassword.addEventListener("keyup", ()=> {
    if(cpassword.value.trim() === "" || cpassword.value.trim() !== password.value.trim()){
        cpassword.setAttribute("style", "background-color: #FF0032;" +
            " border: 2px solid #CD0404");
    } else {
        cpassword.removeAttribute("style");
    }
});

function register() {
    if(validateRegInput()){
        FORM.submit();
    }
}

function validateRegInput() {
    var error = false;
    if(username.value.trim() === "") {
        username.setAttribute("style", "background-color: #FF0032;" +
            " border: 2px solid #CD0404");
        error = true;
    } else {
        username.removeAttribute("style");
    }
    if(password.value.trim() === ""){
        password.setAttribute("style", "background-color: #FF0032;" +
            " border: 2px solid #CD0404");
        error = true;
    } else {
        password.removeAttribute("style");
    }
    if(cpassword.value.trim() === "" || cpassword.value.trim() !== password.value.trim()){
        cpassword.setAttribute("style", "background-color: #FF0032;" +
            " border: 2px solid #CD0404");
        error = true;
    } else {
        cpassword.removeAttribute("style");
    }
    return !error;
}

