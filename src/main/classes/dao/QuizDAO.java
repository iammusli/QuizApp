package dao;

import entities.Answer;
import entities.Question;
import entities.Quiz;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.ArrayList;

public class QuizDAO extends AbstractDAO {

    public QuizDAO() {
        super();
    }

    public Quiz findQuizById(int id) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT q FROM Quiz q WHERE q.id = :id");
            q.setParameter("id", id);
            Quiz quiz = (Quiz) q.getSingleResult();
            em.getTransaction().commit();
            return quiz;
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            if (em != null) {
                em.close();
            }
        }
        return null;
    }

    public ArrayList<Quiz> findQuizzesByOwnerId(int owner_id) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT q FROM Quiz q WHERE q.owner.id = :owner_id");
            q.setParameter("owner_id", owner_id);
            ArrayList<Quiz> quizzes = (ArrayList<Quiz>) q.getResultList();
            em.getTransaction().commit();
            return quizzes;
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return null;
    }

    public ArrayList<Question> findQuestionsByQuizId(int quiz_id) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT q FROM Question q WHERE q.quiz.id = :quiz_id");
            q.setParameter("quiz_id", quiz_id);
            ArrayList<Question> questions = (ArrayList<Question>) q.getResultList();
            em.getTransaction().commit();
            return questions;
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return null;
    }

    public ArrayList<Answer> findAnswersByQuestionId(int question_id) {
        EntityManager em = createEntityManager();
        try{
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT q FROM Answer q WHERE q.question.id = :question_id");
            q.setParameter("question_id", question_id);
            ArrayList<Answer> answers = (ArrayList<Answer>) q.getResultList();
            em.getTransaction().commit();
            return answers;
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return null;
    }

}
