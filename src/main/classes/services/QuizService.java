package services;

import dao.QuizDAO;
import entities.Answer;
import entities.Question;
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

    public ArrayList<Question> getQuestionsByQuizId(int quizId) {
        return quizDAO.findQuestionsByQuizId(quizId);
    }

    public ArrayList<Answer> getAnswersByQuestionId(int questionId) {
        return quizDAO.findAnswersByQuestionId(questionId);
    }

    public boolean removeQuizByID(int quizID) {
        return quizDAO.deleteQuizById(quizID);
    }

    public void saveQuiz(Quiz quiz) {
        quizDAO.saveQuiz(quiz);
    }

    public int saveQuestion(Question question) {
        return quizDAO.saveQuestion(question);
    }

    public int saveAnswer(Answer answer) {
        return quizDAO.saveAnswer(answer);
    }

    public boolean updateQuiz(Quiz quiz) {
        return quizDAO.updateQuiz(quiz);
    }
}
