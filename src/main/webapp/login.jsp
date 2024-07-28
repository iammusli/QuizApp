<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<head>
    <link type="text/css" rel="stylesheet" href="css/login.css">
    <title>Quiz-login</title>
</head>
<body>
<div id="wrapper">
    <div id="left-side-content">
        <div id="data-card">
            <h1>Login</h1>
            <form id="login-form" action="login" method="POST">
                <input id="username" class="input-field" type="text" name="username" placeholder="username">
                <input id="password" class="input-field" type="password" name="password" placeholder="password">
                <input id="login-button" class="button" type="submit" value="submit">
            </form>
        </div>
        <div id="note">
            <p>Don't have an account?</p>
            <button id="note-button"><a href="<%= request.getContextPath() + "/register"%>">register</a></button>
        </div>
    </div>
    <div id="right-side-content">

    </div>
</div>
</body>
</html>


