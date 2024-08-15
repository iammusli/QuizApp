package entities;
import javax.websocket.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class QuizRoom {
    private String quizPIN;
    private String adminID;
    private List<Session> clientSessions;

    public QuizRoom(String quizPIN, String adminID){
        this.quizPIN = quizPIN;
        this.adminID = adminID;
        this.clientSessions = new ArrayList<Session>();
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
    public boolean isAdmin(Session session){
        return adminID.equals(session.getId());
    }
    public void handleMessage(Session sender, Message message){
        if(isAdmin(sender) || !message.isAdminAction()){
            broadcastMessage(message);
        } else {
            sendError(sender, "Unauthorized action attempt!");
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
