package entities;

import java.util.concurrent.ConcurrentHashMap;

public class QuizSessionsController {
    private ConcurrentHashMap<String, QuizRoom> activeSessions;

    public QuizSessionsController() {
        this.activeSessions = new ConcurrentHashMap<String, QuizRoom>();
    }

    public QuizRoom createSession(String quizPIN, String adminID){
        QuizRoom newRoom = new QuizRoom(quizPIN, adminID);
        activeSessions.put(quizPIN, newRoom);
        return newRoom;
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
