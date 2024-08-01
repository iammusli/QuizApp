$(document).ready(function() {
    $('#play').click(function(event) {
        event.preventDefault();
        $.ajax({
            url: '/rwa/admin/play',
            type: 'GET',
            success: function(data) {
                $('.content').html(`
                    <div id="pin-input-wrapper">
                        <div id="pin-input-main-content">
                            <div id="pin-input-left-side-content">
                                <div class="pin-input-form-wrapper">
                                    <h1>Enter quiz PIN</h1>
                                    <form id="pin-input-pin-form">
                                        <input id="pin1" class="pin-input-pin" name="pin" type="text" maxlength="1">
                                        <input id="pin2" class="pin-input-pin" name="pin" type="text" maxlength="1">
                                        <input id="pin3" class="pin-input-pin" name="pin" type="text" maxlength="1">
                                        <input id="pin4" class="pin-input-pin" name="pin" type="text" maxlength="1">
                                    </form>
                                    <button id="pin-input-submit-button" class="pin-input-button">Play</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                const re = /[0-9]/;
                const inputs = document.querySelectorAll(".pin-input-pin");
                const submitBtn = document.getElementById("pin-input-submit-button");

                inputs.forEach((input, key) => {
                    if (key !== 0) {
                        input.addEventListener("click", function () {
                            if (input.value === "") inputs[0].focus();
                        });
                    }
                    input.addEventListener("keyup", function () {
                        if (input.value) {
                            if (re.test(input.value)) {
                                input.setAttribute("style", "border: 2px solid #059212; background-color: #06D001");
                                if (key !== 3) {
                                    inputs[key + 1].focus();
                                }
                            } else {
                                input.setAttribute("style", "border: 2px solid #CD0404; background-color: #FF0032");
                            }
                        }
                    });
                });

                submitBtn.addEventListener("click", function() {
                    var form = new FormData();
                    var pin_str = "";
                    var ready = true;
                    for (let i = 0; i < inputs.length; ++i) {
                        if (re.test(inputs[i].value) === false) {
                            ready = false;
                        }
                    }
                    if (ready) {
                        inputs.forEach((input) => {
                            pin_str += input.value;
                        });
                        form.set("pin", pin_str);

                        console.log(pin_str);
                    }
                });
            },
        });
    });

    $('.navigation a').not('#play').click(function(event) {
        event.preventDefault();
        $('.content').empty();
    });
});
