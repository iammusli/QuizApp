package bootstrap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entities.Answer;
import entities.Question;
import entities.Quiz;
import entities.User;
import dao.QuizDAO;
import dao.UserDAO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import services.QuizService;
import services.UserService;
import utils.AnswerSerializer;
import utils.QuestionSerializer;
import utils.QuizSerializer;
import utils.UserSerializer;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
/*
        UserDAO userDAO = new UserDAO();
        User u = userDAO.findUserByUsername("Revaz");
        if (u != null) {
            System.out.println(u.getId());
        }
        QuizDAO quizDAO = new QuizDAO();
        ArrayList<Quiz> q = quizDAO.findQuizzesByOwnerId(u.getId());
        if (q != null) {
            String title = q.get(0).getQuestions().get(0).getAnswers().get(0).getAnswer_text();
            System.out.println(title);
        }
        User user = userDAO.findUserByUsername("mirza");
        userDAO.removeUser(user);
*/
/*
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();
        UserService userService = new UserService(new UserDAO());
        QuizService quizService = new QuizService(new QuizDAO());
        User user = userService.findByUsername("qqqq");
        em.getTransaction().begin();
        Quiz quiz = new Quiz();
        quiz.setTitle("Quiz 1");
        quiz.setOwner(user);
        Question question = new Question(60, 10, "What is your name?", quiz);
        Answer answer = new Answer("Mirza", question, true);
        Answer answer2 = new Answer("Anna", question, false);
        answer.setQuestion(question);
        answer2.setQuestion(question);
        question.addAnswer(answer).addAnswer(answer2);
        em.persist(quiz);
        em.persist(question);
        em.persist(answer);
        em.persist(answer2);
        em.getTransaction().commit();
        em.close();
        emf.close();
*/
        UserService userService = new UserService(new UserDAO());
        QuizService quizService = new QuizService(new QuizDAO());
        ArrayList<Quiz> quizzes;
        User user = userService.findByUsername("qqqq");
        quizzes = quizService.getAllQuizFromCreator(user.getId());
        if(quizzes != null)
            System.out.println(quizzes.get(0).getTitle());
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(Question.class, new QuestionSerializer())
                .registerTypeAdapter(Answer.class, new AnswerSerializer())
                .registerTypeAdapter(Quiz.class, new QuizSerializer())
                .registerTypeAdapter(User.class, new UserSerializer())
                .create();
        String json = gson.toJson(quizzes);
        System.out.println(json);
    }
}
