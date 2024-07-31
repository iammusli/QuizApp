package services;

import dao.QuizDAO;
import entities.Quiz;

import java.util.ArrayList;

public class QuizService {
    private QuizDAO quizDAO;

    public QuizService(QuizDAO quizDAO) {
        this.quizDAO = quizDAO;
    }

    public ArrayList<Quiz> getAllQuizFromCreator(int creatorId) {
        return quizDAO.findQuizzesByOwnerId(creatorId);
    }

    public Quiz getQuizById(int quizId) {
        return quizDAO.findQuizById(quizId);
    }
}
