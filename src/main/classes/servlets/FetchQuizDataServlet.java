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

@WebServlet (name = "fetchQuizDataServlet", value = "/admin/quizzes")
public class FetchQuizDataServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private User user;
    private QuizService quizService;

    public FetchQuizDataServlet() {
        super();
        quizService = new QuizService(new QuizDAO());
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        user = (User) request.getSession().getAttribute("user");
        ArrayList<Quiz> quizzes = new ArrayList<>();
        quizzes = quizService.getAllQuizFromCreator(user.getId());
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.excludeFieldsWithoutExposeAnnotation();
        Gson gson = gsonBuilder
                .registerTypeAdapter(Quiz.class, new QuizSerializer())
                .registerTypeAdapter(Question.class, new QuestionSerializer())
                .registerTypeAdapter(Answer.class, new AnswerSerializer())
                .create();
        String json = gson.toJson(quizzes);
        PrintWriter out = response.getWriter();
        out.println(json);
        out.flush();
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
