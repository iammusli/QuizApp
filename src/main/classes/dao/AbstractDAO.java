package dao;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;

abstract class AbstractDAO {
    private static final String PERSISTENCE_UNIT = "default";

    public EntityManager createEntityManager(){
        EntityManagerFactory emf = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT);
        return emf.createEntityManager();
    }
}
