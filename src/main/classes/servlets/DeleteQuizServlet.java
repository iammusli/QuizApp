package servlets;

import dao.QuizDAO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.QuizService;

import java.io.IOException;

@WebServlet (name="deleteQuizServlet", value="/admin/quizzes/delete")
public class DeleteQuizServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private QuizService quizService;

    public DeleteQuizServlet() {
        super();
        quizService = new QuizService(new QuizDAO());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Deleted quiz ID: " + request.getParameter("quizId"));
        String quizId = request.getParameter("quizId");
        boolean success = quizService.removeQuizByID(Integer.parseInt(quizId));
        if(success)
            response.setStatus(200);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
