package servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.QuizDAO;
import entities.Answer;
import entities.Question;
import entities.Quiz;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.QuizService;
import utils.AnswerSerializer;
import utils.QuestionSerializer;
import utils.QuizSerializer;
import utils.UserSerializer;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet (name = "fetchEmptyQuizServlet", value = "/admin/quiz/empty")
public class FetchEmptyQuizServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private User user;
    private QuizService quizService;

    public FetchEmptyQuizServlet() {
        super();
        quizService = new QuizService(new QuizDAO());
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        User user = (User) request.getSession().getAttribute("user");
        Quiz quiz = new Quiz();
        quiz.setOwner(user);
        quiz.setTitle("Quiz");
        Question question = new Question();
        question.setQuiz(quiz);
        question.setSeconds(60);
        question.setPoints(10);
        question.setQuestion("Question");
        quiz.addQuestion(question);
        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setCorrect(false);
        answer.setAnswer_text("Answer");
        question.addAnswer(answer);
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(Quiz.class, new QuizSerializer())
                .registerTypeAdapter(User.class, new UserSerializer())
                .registerTypeAdapter(Question.class, new QuestionSerializer())
                .registerTypeAdapter(Answer.class, new AnswerSerializer())
                .create();
        String json = gson.toJson(quiz);
        PrintWriter out = response.getWriter();
        out.println(json);
        out.flush();
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}

