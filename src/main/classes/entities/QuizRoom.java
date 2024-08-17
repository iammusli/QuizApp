package entities;
import dao.QuizDAO;
import services.QuizService;

import javax.websocket.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;

public class QuizRoom {
    private String quizPIN;
    private Quiz quiz;
    private List<Session> clientSessions;
    private Map<String, String> playerAnswers;
    private ScheduledExecutorService scheduler;
    private ScheduledFuture<?> questionTimer;
    private Iterator<Question> questionIterator;
    private Question currentQuestion;
    private int questionTimeLimit = 30;

    public QuizRoom(String quizPIN, int quizID){
        this.quizPIN = quizPIN;
        this.quiz = new QuizService(new QuizDAO()).getQuizById(quizID);
        this.clientSessions = new ArrayList<Session>();
        this.playerAnswers = new ConcurrentHashMap<>();
        this.scheduler = Executors.newScheduledThreadPool(1);
        this.questionIterator = quiz.getQuestions().iterator();
    }
    public String getQuizPIN() {
        return quizPIN;
    }
    public void addClientSession(Session session){
        this.clientSessions.add(session);
    }
    public void removeClientSession(Session session){
        this.clientSessions.remove(session);
    }
    public List<Session> getClientSessions() {
        return clientSessions;
    }
    public void broadcastMessage(Message message){
        for(Session client : clientSessions){
            try {
                client.getBasicRemote().sendText(message.toJson());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void sendError(Session sender, String message){
        try{
            sender.getBasicRemote().sendText(new Message(message, "ERROR", "SERVER", quizPIN, false).toJson());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
