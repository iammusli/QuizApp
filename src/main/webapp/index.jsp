<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="text/css" rel="stylesheet" href="css/index.css">
    <title>Quiz</title>
</head>
<body>
<div id="wrapper">
    <div id="main-content">
        <div id="left-side-content">
            <div class="form-wrapper">
                <h1>Enter quiz PIN</h1>
                <form id="pin-form">
                    <input id="pin1" class="pin" name="pin" type="text" maxlength="1">
                    <input id="pin2" class="pin" name="pin" type="text" maxlength="1">
                    <input id="pin3" class="pin" name="pin" type="text" maxlength="1">
                    <input id="pin4" class="pin" name="pin" type="text" maxlength="1">
                </form>
                <button id="submit-button" class="button">play</button>
            </div>
        </div>
        <div id="right-side-content">
            <button id="login" class="button"><a href="login">login</a></button>
        </div>
    </div>
</div>
<script src="js/validatePinInput.js"></script>
</body>
</html>
