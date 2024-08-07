package servlets;

import com.google.gson.Gson;
import dao.QuizDAO;
import entities.Quiz;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.QuizService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet (name="homeServlet" , value = "/admin/*")
public class HomeServlet extends HttpServlet {
    private static final long serialVersionUID = 3L;
    private User user;
    private QuizService quizService;

    public HomeServlet() {
        super();
        quizService = new QuizService(new QuizDAO());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(req.getRequestURI().equals("/admin/quizzes")) {
            user = (User) req.getSession().getAttribute("user");
            ArrayList<Quiz> quizzes = quizService.getAllQuizFromCreator(user.getId());
            req.getSession().setAttribute("quizzes", quizzes);
            req.getSession().setAttribute("page", "quizzes");
        }
        if(req.getRequestURI().equals("/admin/quizzes/edit")) {
            req.getRequestDispatcher("/edit-quiz.jsp").forward(req, resp);
        }
        req.getRequestDispatcher("/home.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

}
