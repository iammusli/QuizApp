


const inputs = document.querySelectorAll("input");
var form = document.getElementById("pin-form");
const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("click", submitPin);
const re = /[0-9]/;

/*
inputs.forEach((input, key) => {
    input.addEventListener("click", function () {
        input.value = "";
        input.removeAttribute("style");
    });
}); */

/*
inputs.forEach((input, key) => {
    input.addEventListener("keyup", function() {
        if(input.value){
            if(re.test(input.value)){
                input.setAttribute("style",
                    "border: 2px solid #059212; background-color: #06D001");
            } else {
                input.setAttribute("style",
                    "border: 2px solid #CD0404; background-color: #FF0032");
            }
        }
    });
});*/

inputs.forEach((input, key) => {
    if (key !== 0) {
        input.addEventListener("click", function () {
            if(input.value === "")
                inputs[0].focus();
        });
    }
    input.addEventListener("keyup", function () {
        if (input.value) {
            if(re.test(input.value)){
                input.setAttribute("style",
                    "border: 2px solid #059212; background-color: #06D001");
                if (key !== 3) {
                    inputs[key + 1].focus();
                }
            } else {
                input.setAttribute("style",
                    "border: 2px solid #CD0404; background-color: #FF0032");
            }

        }
    });
});


function submitPin() {
    var form = new FormData();
    var pin_str = "";
    var ready = true;
    for(let i = 0; i < inputs.length; ++i){
        if(re.test(inputs[i].value) === false) {
            ready = false;
        }
    }
    if(ready) {
        inputs.forEach((input) => {
            pin_str += input.value;
        })
        form.set("pin", pin_str);

        console.log(pin_str);
        /*
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(this.status === 200 && this.readyState === 4) {
                console.log("all good");
            }
        }
        xhr.open("GET", "NEKIURL", true);
        xhr.send(); */
    }
}

