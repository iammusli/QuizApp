<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/quiz.css" />
    <title>Quiz - Client</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
<div class="container">
    <div class="content">
        <input type="hidden" id="quiz-id" value='<%= request.getAttribute("quizID") %>' />
        <input type="hidden" id="quiz-pin" value='<%= request.getAttribute("quizPIN") %>' />
        <div class="quiz-card" id="quiz-card">
            <div class="quiz-header">
                <h1 id="quiz-title"></h1>
                <p id="quiz-category"></p>
            </div>
            <div class="quiz-question">
                <p id="question-text"></p>
            </div>
            <div class="quiz-timer">
                <div class="circle-container">
                    <div class="semicircle"></div>
                    <div class="semicircle"></div>
                    <div class="semicircle"></div>
                    <div class="outermost-circle"></div>
                </div>
                <div class="timer-container">
                    <div class="timer">00:00</div>
                </div>
            </div>
            <div class="quiz-info-bar">
                <div class="points">
                    <i class="fas fa-star"></i> <span id="points">0 Points</span>
                </div>
            </div>
            <div class="players-circle">
                <i class="fas fa-users"></i> <span id="players">5</span>
            </div>
            <div class="quiz-options" id="quiz-options">
                <!-- Options will be added dynamically here -->
            </div>
            <div class="quiz-footer">
                <button id="next-question">Next Question</button>
                <div class="quiz-info">
                    <p>Question <span id="current-question-number">0</span> of <span id="total-questions">0</span></p>
                </div>
            </div>
            <div id="results-popup" class="popup-overlay" style="display: none;">
                <div class="popup-content">
                    <h2>Results</h2>
                    <p id="correct-answers-popup"></p>
                    <p id="incorrect-answers-popup"></p>
                    <p id="score-popup"></p>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/quiz-client.js"></script>
</body>
</html>
