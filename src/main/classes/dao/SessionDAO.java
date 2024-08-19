package dao;

import entities.ActivePlaySession;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;

import java.util.ArrayList;
import java.util.List;

public class SessionDAO extends AbstractDAO {
    private static final int MAX_PIN = 9999;
    private static final int MIN_PIN = 0;

    public SessionDAO() {}

    public void save(ActivePlaySession session){
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(session);
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
    public ActivePlaySession getActivePlaySessionByPIN(int pin){
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT s FROM ActivePlaySession s WHERE s.quizPIN = :pin");
            q.setParameter("pin", pin);
            ActivePlaySession session = (ActivePlaySession) q.getSingleResult();
            em.getTransaction().commit();
            return session;
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

    public List<ActivePlaySession> getAllActivePlaySessions(){
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT s FROM ActivePlaySession s");
            List<ActivePlaySession> sessions = (ArrayList<ActivePlaySession>) q.getResultList();
            em.getTransaction().commit();
            return sessions;
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

    public void delete(int quizPIN){
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("DELETE FROM ActivePlaySession s WHERE s.quizPIN = :sessionID");
            q.setParameter("sessionID", quizPIN);
            q.executeUpdate();
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public int generateUniqueQuizPIN() {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();

            // Find the highest quizPIN currently used
            TypedQuery<Integer> query = (TypedQuery<Integer>) em.createQuery("SELECT MAX(s.quizPIN) FROM ActivePlaySession s");
            Integer maxPin = query.getSingleResult();

            // Generate new PIN
            int newPin = (maxPin == null) ? MIN_PIN : (maxPin + 1) % (MAX_PIN + 1);

            // Handle wrap-around
            if (newPin > MAX_PIN) {
                newPin = MIN_PIN;
            }

            em.getTransaction().commit();
            return newPin;
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            if (em != null) {
                em.close();
            }
        }
        return MIN_PIN; // Default or error value
    }
}
