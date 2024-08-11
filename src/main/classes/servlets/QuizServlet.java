package servlets;

import entities.Answer;
import entities.Question;
import entities.Quiz;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.QuizService;
import utils.AnswerDTO;
import utils.QuestionDTO;
import utils.QuizDTO;
import dao.QuizDAO;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "quizServlet", value = "/play")
public class QuizServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private QuizService quizService;

    @Override
    public void init() throws ServletException {
        super.init();
        quizService = new QuizService(new QuizDAO());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String quizID = request.getParameter("quizID");
        if (quizID != null) {
            try {
                int id = Integer.parseInt(quizID);
                Quiz quiz = quizService.getQuizById(id);
                List<Question> questions = quizService.getQuestionsByQuizId(id);

                QuizDTO quizDTO = new QuizDTO();
                quizDTO.setTitle(quiz.getTitle());
                quizDTO.setCategory(quiz.getCategory());

                List<QuestionDTO> questionDTOs = new ArrayList<>();
                for (Question question : questions) {
                    QuestionDTO questionDTO = new QuestionDTO();
                    questionDTO.setQuestion(question.getQuestion());
                    questionDTO.setPoints(question.getPoints());
                    questionDTO.setSeconds(question.getSeconds());

                    List<AnswerDTO> answerDTOs = new ArrayList<>();
                    List<Answer> answers = quizService.getAnswersByQuestionId(question.getId());
                    for (Answer answer : answers) {
                        AnswerDTO answerDTO = new AnswerDTO();
                        answerDTO.setAnswer_text(answer.getAnswer_text());
                        answerDTO.setCorrect(answer.isCorrect());
                        answerDTOs.add(answerDTO);
                    }
                    questionDTO.setAnswers(answerDTOs);
                    questionDTOs.add(questionDTO);
                }
                quizDTO.setQuestions(questionDTOs);

                request.setAttribute("quiz", quizDTO);
                request.getRequestDispatcher("/quiz.jsp").forward(request, response);

            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid quiz ID");
            }
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing quiz ID");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
