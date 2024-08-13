package com.example.websocket;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@ServerEndpoint("/admin/quiz")
public class QuizWebSocketServer {

    private static String globalPin = null; //Admin ce u socket da posalje SEND_PIN:
    private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<>()); //Sesija svakog klijenta

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("New connection opened, session id: " + session.getId());//klijent ID
        sessions.add(session);
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println("Received message: " + message + " from session id: " + session.getId());

        if (message.startsWith("PIN_ATTEMPT:")) {
            String receivedPin = message.substring(12); //pokupi pin

            if (globalPin != null && receivedPin.equals(globalPin)) {
                session.getBasicRemote().sendText("VALID_PIN");
            } else {
                session.getBasicRemote().sendText("INVALID_PIN");
            }
        } else if (message.startsWith("SEND_PIN:")) {
            globalPin = message.substring(9); //Postavlja se novi globalni pin

            //Broadcast novog pina svim sesijama
            synchronized (sessions) {
                for (Session s : sessions) {
                    s.getBasicRemote().sendText("PIN:" + globalPin);
                }
            }
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("Session closed, session id: " + session.getId());
        sessions.remove(session);
    }

    @OnError
    public void onError(Throwable error) {
        System.err.println("Error in WebSocket connection: " + error.getMessage());
    }
}
