package servlets;

import com.google.gson.Gson;
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
import utils.AnswerDTO;
import utils.QuestionDTO;
import utils.QuizDTO;

import java.io.IOException;

@WebServlet (name = "createQuizServlet", value = "/admin/quizzes/create")
public class CreateQuizServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private QuizService quizService;

    public CreateQuizServlet() {
        super();
        quizService = new QuizService(new QuizDAO());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/createQuiz.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        String json = request.getParameter("quiz");
        User user = (User) request.getSession().getAttribute("user");
        System.out.println(json);

        Gson gson = new Gson();
        QuizDTO quizDTO = gson.fromJson(json, QuizDTO.class);

        System.out.println(quizDTO.getCategory());

        Quiz quiz = new Quiz();
        quiz.setTitle(quizDTO.getTitle());
        quiz.setOwner(user);
        quiz.setCategory(quizDTO.getCategory());

        for(QuestionDTO questionDTO : quizDTO.getQuestions()) {
            Question question = new Question();
            question.setQuestion(questionDTO.getQuestion());
            question.setQuiz(quiz);
            question.setPoints(questionDTO.getPoints());
            question.setSeconds(questionDTO.getSeconds());

            quiz.addQuestion(question);

            for(AnswerDTO answerDTO : questionDTO.getAnswers()) {
                Answer answer = new Answer();
                answer.setAnswer_text(answerDTO.getAnswer_text());
                answer.setQuestion(question);
                answer.setCorrect(answerDTO.isCorrect());

                question.addAnswer(answer);
            }
        }
        quizService.saveQuiz(quiz);
    }
}
