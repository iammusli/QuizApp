<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Page</title>
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
<div class="wrapper">
    <input type="hidden" id="quiz-id" value="<%= request.getSession().getAttribute("quizID") %>">
    <input type="hidden" id="quiz-pin" value="<%= request.getSession().getAttribute("quizPIN") %>">
    <% if (request.getSession().getAttribute("playerID") != null) { %>
    <input type="hidden" id="player-id" value="<%= request.getSession().getAttribute("playerID") %>">
    <% } %>
    <div class="question-details-wrapper">
        <div class="question-wrapper">
            <p id="question-text">Question</p>
        </div>
        <div class="timer-wrapper">
            <div id="timer-circle">
                <div id="timer-label">00:00</div>
            </div>
        </div>
        <div class="player-count-wrapper">
            <div id="player-count-bubble">
                <ion-icon name="people-outline"></ion-icon>
                <span id="player-count">0</span>
            </div>
        </div>
    </div>
    <div class="answers-wrapper">
        <div class="answer" id="answer-text-1">Answer 1</div>
        <div class="answer" id="answer-text-2">Answer 2</div>
        <div class="answer" id="answer-text-3">Answer 3</div>
        <div class="answer" id="answer-text-4">Answer 4</div>
    </div>
    <div class="buttons-wrapper">
        <button id="start">Start</button>
        <button id="skip">Skip</button>
        <button id="end">End</button>
    </div>

    <script src="js/timer.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</div>
</body>
</html>
