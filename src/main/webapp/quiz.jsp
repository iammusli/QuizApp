<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="utils.QuizDTO, utils.QuestionDTO, utils.AnswerDTO" %>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/quiz.css" />
    <title>Quiz - Play</title>
    <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
</head>
<body>
<%
    QuizDTO quizDTO = (QuizDTO) request.getAttribute("quiz");
%>
<div class="container">
    <div class="content">
        <div class="quiz-card" id="quiz-card">
            <div class="quiz-header">
                <h1><%= quizDTO.getTitle() %></h1>
                <p><%= quizDTO.getCategory() %></p>
            </div>
            <div class="quiz-question">
                <p id="question-text"><%= quizDTO.getQuestions().get(0).getQuestion() %></p>
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
                    <i class="fas fa-star"></i> <span id="points"><%= quizDTO.getQuestions().get(0).getPoints() %> Points</span>
                </div>
            </div>
            <div class="players-circle">
                <i class="fas fa-users"></i> <span id="players">5</span>
            </div>

            <div class="quiz-options">
                <%
                    for (AnswerDTO answer : quizDTO.getQuestions().get(0).getAnswers()) {
                %>
                <button class="quiz-option"><%= answer.getAnswer_text() %></button>
                <%
                    }
                %>
            </div>
            <div class="quiz-footer">
                <button id="next-question">Next Question</button>
                <div class="quiz-info">
                    <p>Question 1 of <%= quizDTO.getQuestions().size() %></p>
                </div>
            </div>

        </div>
    </div>
</div>
<script src="js/timer.js"></script>
</body>
</html>
