<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Quiz Page</title>
    <link rel="stylesheet" type="text/css" href="css/admin.css">
</head>
<body>
<div id="wrapper">
    <input type="hidden" id="quiz-id" value="<%= request.getSession().getAttribute("quizID") %>">
    <input type="hidden" id="quiz-pin" value="<%= request.getSession().getAttribute("quizPIN") %>">
    <% if (request.getSession().getAttribute("playerID") != null) { %>
    <input type="hidden" id="player-id" value="<%= request.getSession().getAttribute("playerID") %>">
    <% } %>

    <div id="header">
        <h1>HELLO <%= request.getSession().getAttribute("playerID") %>!</h1>
    </div>

    <div id="main-content">
        <div id="question-section">
            <h2 id="question-text">Question</h2>
            <div id="answers">
                <h3 id="answer-text-1">Answer 1</h3>
                <h3 id="answer-text-2">Answer 2</h3>
                <h3 id="answer-text-3">Answer 3</h3>
                <h3 id="answer-text-4">Answer 4</h3>
            </div>
        </div>

        <div id="controls-section">
            <button id="start" class="control-button">Start</button>
            <button id="skip" class="control-button">Skip</button>
            <button id="end" class="control-button">End</button>
        </div>

        <div id="player-count-section">
            <div id="player-count-bubble">
                <ion-icon name="person-circle-outline"></ion-icon>
                <span id="player-count">0</span>
            </div>
        </div>
    </div>
</div>

<script src="js/timer.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
