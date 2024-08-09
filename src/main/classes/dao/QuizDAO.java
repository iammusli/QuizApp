package dao;

import entities.Answer;
import entities.Question;
import entities.Quiz;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.ArrayList;
import java.util.List;

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
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
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
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
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
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
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
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return null;
    }

    public boolean deleteQuizById(int id) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query quiz = em.createQuery("DELETE FROM Quiz q WHERE q.id = :id");
            Query question = em.createQuery("DELETE FROM Question q WHERE q.quiz.id = :id");
            List<Question> questions = (List<Question>) findQuestionsByQuizId(id);
            List<Answer> answers = new ArrayList<>();
            for(Question q : questions) {
                answers.addAll(findAnswersByQuestionId(q.getId()));
            }
            for(Answer a : answers) {
                Query answer = em.createQuery("DELETE FROM Answer q WHERE q.id = :id");
                answer.setParameter("id", a.getId());
                answer.executeUpdate();
            }
            quiz.setParameter("id", id);
            question.setParameter("id", id);
            question.executeUpdate();
            quiz.executeUpdate();
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return false;
    }

    public void saveQuiz(Quiz quiz) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(quiz);
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            if(em != null) {
                em.close();
            }
        }
    }

    public int saveQuestion(Question question) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(question);
            em.getTransaction().commit();
            return question.getId();
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return -1;
    }

    public int saveAnswer(Answer answer){
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(answer);
            em.getTransaction().commit();
            return answer.getId();
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return -1;
    }

    public boolean updateQuiz(Quiz quiz) {
        EntityManager em = createEntityManager();
        try{
            em.getTransaction().begin();
            em.persist(quiz);
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
        } finally {
            if(em != null) {
                em.close();
            }
        }
        return false;
    }

}
