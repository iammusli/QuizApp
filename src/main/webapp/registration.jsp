<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link type="text/css" rel="stylesheet" href="css/login.css">
<html>
<head>
    <title>Quiz-login</title>
</head>
<body>
<div id="wrapper">
    <div id="left-side-content">
        <div id="data-card">
            <h1>Register</h1>
            <form id="login-form" action="register" method="POST">
                <input id="username" name="username" class="input-field" type="text" placeholder="username">
                <input id="password" name="password" class="input-field" type="password" placeholder="password">
                <input id="cpassword" class="input-field" type="password" name="confirmPassword" placeholder="confirm password">
                <input id="login-button" class="button" type="submit" value="submit">
            </form>
        </div>
        <div id="note">
            <p>Already have an account?</p>
            <button id="note-button"><a href="<%= request.getContextPath() + "/login"%>"><p>login</p></a></button>
        </div>
    </div>
    <div id="right-side-content">

    </div>
</div>
<script src="js/register.js"></script>
</body>
</html>

