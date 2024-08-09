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

@WebServlet (name = "editQuizServlet", value = "/admin/quizzes/edit")
public class EditQuizServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private QuizService quizService;

    public EditQuizServlet() {
        super();
        quizService = new QuizService(new QuizDAO());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String quizID = request.getParameter("quizID");
        Quiz quiz = quizService.getQuizById(Integer.parseInt(quizID));

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.excludeFieldsWithoutExposeAnnotation();
        gsonBuilder.registerTypeAdapter(Quiz.class, new QuizSerializer())
                        .registerTypeAdapter(Question.class, new QuestionSerializer())
                        .registerTypeAdapter(Answer.class, new AnswerSerializer());
        Gson gson = gsonBuilder.create();
        String jsonData = gson.toJson(quiz);
        request.setAttribute("jsonData", jsonData);

        request.getRequestDispatcher("/editQuiz.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
