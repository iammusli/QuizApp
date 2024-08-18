package dao;

import entities.ActivePlaySession;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

public class SessionDAO extends AbstractDAO {
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
}
