package services;

import dao.SessionDAO;
import entities.ActivePlaySession;

public class SessionService {
    private SessionDAO sessionDAO;

    public SessionService() {
        sessionDAO = new SessionDAO();
    }

    public ActivePlaySession getActivePlaySessionByPIN(int pin) {
        return sessionDAO.getActivePlaySessionByPIN(pin);
    }
    public void removeActivePlaySessionByPIN(int pin) {
        sessionDAO.delete(pin);
    }
    public void saveActivePlaySession(ActivePlaySession activePlaySession) {
        sessionDAO.save(activePlaySession);
    }
    public int generateQuizPIN() {
        return sessionDAO.generateUniqueQuizPIN();
    }
}
