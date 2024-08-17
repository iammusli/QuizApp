package entities;

import java.util.concurrent.ConcurrentHashMap;

public class QuizSessionsController {
    private ConcurrentHashMap<String, QuizRoom> activeSessions;

    public QuizSessionsController() {
        this.activeSessions = new ConcurrentHashMap<String, QuizRoom>();
    }

    public void addSession(QuizRoom session){
        activeSessions.put(session.getQuizPIN(), session);
    }

    public QuizRoom getSession(String quizPIN){
        return activeSessions.get(quizPIN);
    }

    public void removeSession(String quizPIN){
        activeSessions.remove(quizPIN);
    }

    public boolean sessionExists(String quizPIN){
        return activeSessions.containsKey(quizPIN);
    }
}
