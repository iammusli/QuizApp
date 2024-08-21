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
            <div class="quiz-info-bar">
                <div class="points">
                    <i class="fas fa-star"></i> <span id="points">0 Points</span>
                </div>
            </div>
            <div class="players-circle">
                <i class="fas fa-users"></i> <span id="players"></span>
            </div>
            <div class="quiz-options" id="quiz-options">
                <!-- Options will be added dynamically here -->
            </div>
            <div id="results-popup" class="popup-overlay" style="display: none;">
                <div class="popup-content">
                    <h2>Results</h2>
                    <ol id="list">

                    </ol>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/quiz-client.js"></script>
</body>
</html>
