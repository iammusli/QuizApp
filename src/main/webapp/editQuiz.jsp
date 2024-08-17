<%@ page import="entities.Quiz" %>
<%@ page import="services.QuizService" %>
<%@ page import="dao.QuizDAO" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<head>
    <title>Quiz - Edit</title>
    <link rel="stylesheet" href="../../css/editQuiz.css">
</head>
<body>
<%
    String quizID = request.getParameter("quizID");
    QuizService quizService = new QuizService(new QuizDAO());
    Quiz quiz = new Quiz();
    quiz = quizService.getQuizById(Integer.parseInt(quizID));
%>
<div id="wrapper">
    <div id="main-content">
            <div id="left-side-content">
                <div class="left-side-quiz-space" >
                    <div class="headline">
                        <h1>Edit quiz</h1>
                    </div>
                    <div class="quiz-space">
                        <div class="quiz-details">
                            <label for="quiz-name">Quiz name</label>
                            <input type="text" id="quiz-name" class="quiz-input-field">
                            <label for="quiz-category">Quiz category</label>
                            <input type="text" id="quiz-category" class="quiz-input-field">
                        </div>
                        <div class="quiz-buttons">
                            <button id="create-question-btn" class="button">Create question</button>
                            <button id="create-quiz-btn" class="button">Update quiz</button>
                            <button id="cancel-btn" class="button">Cancel</button>
                        </div>
                    </div>
                </div>
                <div class="right-side-quiz-space">
                    <div class="question-container">

                    </div>
                </div>
            </div>
        <div id="right-side-content">
            <div class="box">
                <div id="id" class="card">
                    <div class="front">
                        <div class="quiz-category">
                            <h3 id="quiz-card-category" class="quiz-category"></h3>
                        </div>
                        <div>
                            <img class="quiz-picture" src = "../../assets/background1.jpg" alt="bg">
                        </div>
                        <div class="quiz-details">
                            <h3 id="quiz-card-name" class="quiz-name"></h3>
                            <h5 id="quiz-card-question-number" class="question-number"></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="jsonData" data-json='<%= request.getAttribute("jsonData") %>' style="display: none;"></div>
<script src="../../js/editQuiz.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
