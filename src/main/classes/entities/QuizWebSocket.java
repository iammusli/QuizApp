package entities;

import com.google.gson.Gson;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import services.SessionService;

import java.util.Objects;


@ServerEndpoint("/quiz/{quizPIN}/{quizID}")
public class QuizWebSocket {

    private static final QuizSessionsController sessionController = QuizSessionsController.getInstance();
    private final SessionService sessionService = new SessionService();
    private final Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session, @PathParam("quizPIN") String quizPin, @PathParam("quizID") int quizID) {
        QuizRoom room = sessionController.getSession(quizPin);
        if (room == null) {
            room = new QuizRoom(quizPin, quizID);
            room.addClientSession(session);
            sessionController.addSession(room);
        }
        sessionController.getSession(quizPin).addClientSession(session);
       // Message joinMessage = new Message("A new player has joined.", MessageType.JOIN_ROOM.name(), session.getId(), quizPin, false);
        Message joinMessage = new Message("A new player has joined.", MessageType.CHAT_MESSAGE.name(), "SERVER" , quizPin, false);
        sessionController.getSession(quizPin).broadcastMessage(joinMessage);
    }

    @OnMessage
    public void onMessage(String messageJson, Session session, @PathParam("quizPIN") String quizPin) {
        QuizRoom quizRoom = sessionController.getSession(quizPin);
        Message message = gson.fromJson(messageJson, Message.class);

        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        System.out.println("QuizRoom: " + quizRoom.getQuizPIN() + " SenderID: " + message.getSenderID() + " Message: " + message.getContent() );
        System.out.println("Number of participants: " + quizRoom.getClientSessions().size() + " SessionID: " + session.getId());
        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");


        switch (MessageType.valueOf(message.getType())) {
            case ANSWER_SUBMISSION:
                quizRoom.submitAnswer(message.getSenderID(), message.getContent());
                System.out.println("Answer submitted! Sender: " + message.getSenderID() + " Answer: " + message.getContent());
                Message msg;
                if(quizRoom.checkAnswer(Integer.parseInt(message.getContent()))){
                    msg = new Message("true", MessageType.ANSWER_FEEDBACK.name(), message.getSenderID(), quizPin, false);
                } else {
                    msg = new Message("false", MessageType.ANSWER_FEEDBACK.name(), message.getSenderID(), quizPin, false);
                }
                quizRoom.broadcastMessage(msg);
                break;
            case START_QUIZ:
                if (message.isAdminAction()) {
                    quizRoom.currentQuestion();
                    quizRoom.startQuiz();
                }
                break;
            case SKIP_QUESTION:
                if (message.isAdminAction()) {
                    quizRoom.skipQuestion();
                }
                break;
            case END_QUIZ:
                if (message.isAdminAction()) {
                    quizRoom.endQuiz();
                    sessionController.removeSession(quizPin);
                }
                break;
            case QUESTION_BROADCAST:
                quizRoom.broadcastMessage(message);
                break;
            case CHAT_MESSAGE:
                quizRoom.broadcastMessage(message);
                System.out.println("USO JE U CHAT MESSAGE CASE");
                break;
            case JOIN_ROOM:
                quizRoom.broadcastMessage(new Message(Integer.toString(quizRoom.getClientSessions().size()), MessageType.PLAYER_COUNT.name(), "SERVER", quizPin, false));
                break;

                default:
                // Handle other message types
                break;
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("quizPIN") String quizPin) {

        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&& CLOSING &&&&&&&&&&&&&&&&&&&&&&&&&&&");
        System.out.println("SessionID: " + session.getId() + " from " + " QuizRoom: " + quizPin);

        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");


        QuizRoom quizRoom = sessionController.getSession(quizPin);
        quizRoom.removeClientSession(session);
        if(quizRoom.getClientSessions().isEmpty()){
            sessionService.removeActivePlaySessionByPIN(Integer.parseInt(quizRoom.getQuizPIN()));
        }
        Message leaveMessage = new Message("A player has left.", MessageType.LEAVE_ROOM.name(), session.getId(), quizPin, false);
        quizRoom.broadcastMessage(leaveMessage);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }
}
