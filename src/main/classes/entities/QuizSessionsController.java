package entities;

import services.SessionService;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class QuizSessionsController {

    private static QuizSessionsController instance = null;

    private ConcurrentHashMap<String, QuizRoom> activeSessions;

    private QuizSessionsController() {
        this.activeSessions = new ConcurrentHashMap<String, QuizRoom>();
    }

    public static QuizSessionsController getInstance() {
        if (instance == null) {
            synchronized (QuizSessionsController.class) {
                if (instance == null) {
                    instance = new QuizSessionsController();
                }
            }
        }
        return instance;
    }

    public void addSession(QuizRoom session) {
        activeSessions.put(session.getQuizPIN(), session);
    }

    public QuizRoom getSession(String quizPIN) {
        return activeSessions.get(quizPIN);
    }

    public void removeSession(String quizPIN) {
        activeSessions.remove(quizPIN);
    }

    public boolean sessionExists(String quizPIN) {
        return activeSessions.containsKey(quizPIN);
    }

    public int getActiveSessionsCount() {
        return activeSessions.size();
    }

    public void printSessions() {
        for (String key : activeSessions.keySet()) {
            QuizRoom session = activeSessions.get(key);
            System.out.println(session);
        }
    }

    public void syncWithDB(){
        SessionService ss = new SessionService();
        List<ActivePlaySession> aps = ss.getAllActivePlaySessions();
        for ( ActivePlaySession session : aps ) {
            if(!activeSessions.containsKey(Integer.toString(session.getQuizPIN()))){
                activeSessions.put(Integer.toString(session.getQuizPIN()),
                        new QuizRoom(Integer.toString(session.getQuizPIN()), session.getQuizID()));
            }
        }
    }
}
