package dao;

import entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

public class UserDAO extends AbstractDAO {

    public UserDAO() {
        super();
    }

    public User findUserById(int id) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT u FROM User u WHERE u.id = :id");
            q.setParameter("id", id);
            User u = (User) q.getSingleResult();
            em.getTransaction().commit();
            return u;
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
        return null;
    }

    public User findUserByUsername(String username) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT u FROM User u WHERE u.username = :username");
            q.setParameter("username", username);
            User u = (User) q.getSingleResult();
            em.getTransaction().commit();
            return u;
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
        return null;
    }

    public boolean createUser(User user) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
            return true;
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
        return false;
    }

    public boolean validateUser(User user) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("SELECT u FROM User u WHERE u.username = :username " +
                    "AND u.password = :password");
            q.setParameter("username", user.getUsername());
            q.setParameter("password", user.getPassword());
            User u = (User) q.getSingleResult();
            em.getTransaction().commit();
            return u != null;
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
        return false;
    }

    public void updateUser(User user) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(user);
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

    public boolean removeUser(User user) {
        EntityManager em = createEntityManager();
        try {
            em.getTransaction().begin();
            Query q = em.createQuery("DELETE FROM User u WHERE u.username = :username");
            q.setParameter("username", user.getUsername());
            int deletedCount = q.executeUpdate();
            em.getTransaction().commit();
            return deletedCount > 0;
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
        return false;
    }
}
