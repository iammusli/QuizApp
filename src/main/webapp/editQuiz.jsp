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

        </div>
        <div id="right-side-content">
            <div class="box">
                <div id="id" class="card">
                    <div class="front">
                        <div class="quiz-category">
                            <h3 class="quiz-category">Quiz category</h3>
                        </div>
                        <div>
                            <img class="quiz-picture" src = "../../assets/background1.jpg" alt="bg">
                        </div>
                        <div class="quiz-details">
                            <h3 class="quiz-name"><%= quiz.getTitle() %></h3>
                            <h5 class="question-number"> <%= quiz.getQuestions().size() %> questions</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
