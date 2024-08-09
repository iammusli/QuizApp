package servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.QuizDAO;
import entities.Answer;
import entities.Question;
import entities.Quiz;
import entities.User;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.QuizService;
import utils.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


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
        request.getSession().setAttribute("quizID", quizID);
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
        response.setContentType("application/json");
        String json = request.getParameter("quiz");
        User user = (User) request.getSession().getAttribute("user");
        System.out.println(json);

        Gson gson = new Gson();
        QuizDTO quizDTO = gson.fromJson(json, QuizDTO.class);


        Quiz test = quizService.getQuizById(Integer.parseInt((String) request.getSession().getAttribute("quizID")));

        if(test == null) {
            Quiz quiz = new Quiz();
            quiz.setId(Integer.parseInt((String) request.getSession().getAttribute("quizID")));
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
        } else {
            quizService.removeQuizByID(Integer.parseInt((String) request.getSession().getAttribute("quizID")));

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

        request.getRequestDispatcher("/home.jsp").forward(request, response);
    }
}
