<%--
  Created by IntelliJ IDEA.
  User: mirza
  Date: 8/20/2024
  Time: 2:06 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<input type="hidden" id="quiz-id" value='<%= request.getSession().getAttribute("quizID") %>' />
<input type="hidden" id="quiz-pin" value='<%= request.getSession().getAttribute("quizPIN") %>' />
<%
    if(request.getSession().getAttribute("playerID") != null){
%>
<input type="hidden" id="player-id" value='<%= request.getSession().getAttribute("playerID") %>' />
<%
    }
%>
<h1>HELLO <%= request.getSession().getAttribute("playerID") %></h1>
<div>
    <h1 id="question-text">Pitanje</h1>
</div>
<div>
    <h3 id="answer-text-1">odg1</h3>
    <h3 id="answer-text-2">odg2</h3>
    <h3 id="answer-text-3">odg3</h3>
    <h3 id="answer-text-4">odg4</h3>
</div>
<div>
    <button id="start">switch</button>
    <button id="skip">skip</button>
    <button id="end">end</button>
</div>
<div>
    <h3 id="player-count"></h3>
</div>


<script src="js/timer.js"></script>
</body>
</html>
