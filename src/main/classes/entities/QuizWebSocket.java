package entities;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import com.google.gson.Gson;


@ServerEndpoint("/quiz/{quizPin}/{quizID}")
public class QuizWebSocket {

    private static final QuizSessionsController sessionController = QuizSessionsController.getInstance();
    private final Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session, @PathParam("quizPin") String quizPin, @PathParam("quizID") int quizID) {
        QuizRoom quizRoom = sessionController.getSession(quizPin);
        if (quizRoom == null) {
            quizRoom = new QuizRoom(quizPin,quizID);
            sessionController.addSession(quizRoom);
        }
        quizRoom.addClientSession(session);
        Message joinMessage = new Message("A new player has joined.", MessageType.JOIN_ROOM.name(), session.getId(), quizPin, false);
        quizRoom.broadcastMessage(joinMessage);
    }

    @OnMessage
    public void onMessage(String messageJson, Session session, @PathParam("quizPin") String quizPin) {
        QuizRoom quizRoom = sessionController.getSession(quizPin);
        Message message = gson.fromJson(messageJson, Message.class);

        switch (MessageType.valueOf(message.getType())) {
            case ANSWER_SUBMISSION:
                quizRoom.submitAnswer(message.getSenderID(), message.getContent());
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
                break;
            default:
                // Handle other message types
                break;
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("quizPin") String quizPin) {
        QuizRoom quizRoom = sessionController.getSession(quizPin);
        quizRoom.removeClientSession(session);
        Message leaveMessage = new Message("A player has left.", MessageType.LEAVE_ROOM.name(), session.getId(), quizPin, false);
        quizRoom.broadcastMessage(leaveMessage);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }
}
