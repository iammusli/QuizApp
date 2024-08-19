package servlets;

import dao.SessionDAO;
import entities.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.QuizService;
import services.SessionService;
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
    private SessionService sessionService;

    @Override
    public void init() throws ServletException {
        super.init();
        quizService = new QuizService(new QuizDAO());
        sessionService = new SessionService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String uri = request.getQueryString();

        if(uri.startsWith("quizID=")){
            System.out.println("JA SAM ADMIN");
            int sessionPIN = sessionService.generateQuizPIN();
            User user = (User) request.getSession().getAttribute("user");

            String quizID = request.getParameter("quizID");


            try {

                ActivePlaySession acp = new ActivePlaySession(Integer.parseInt(quizID), user.getId(), sessionPIN);
                sessionService.saveActivePlaySession(acp);
                QuizSessionsController quizSessionsController = QuizSessionsController.getInstance();
                quizSessionsController.addSession(new QuizRoom(Integer.toString(sessionPIN), Integer.parseInt(quizID)));
                quizSessionsController.syncWithDB(); // TODO: fix this later
                System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                System.out.println("AKTIVNIH SOBA: " + quizSessionsController.getActiveSessionsCount());
                System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

                request.setAttribute("room", acp);

                int id = Integer.parseInt(quizID);
                Quiz quiz = quizService.getQuizById(id);

                if(!user.isAdmin() && (quiz.getOwner().getId() != user.getId())){
                    return;
                }

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

        } else if(uri.startsWith("quizPIN=")) {
            System.out.println("JA SAM IGRAC");
            String quizPIN = request.getParameter("quizPIN");
            ActivePlaySession acp = sessionService.getActivePlaySessionByPIN(Integer.parseInt(quizPIN));
            if (acp != null) {
                request.setAttribute("quizID", acp.getQuizID());
                request.setAttribute("quizPIN", acp.getQuizPIN());
                if(request.getAttribute("user") != null){
                    request.setAttribute("playerID", ((User)request.getSession().getAttribute("user")).getUsername());
                }
                request.getRequestDispatcher("/quiz-client.html").forward(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
