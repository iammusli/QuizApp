package entities;

import com.google.gson.Gson;

enum MessageType {
    JOIN_ROOM,
    LEAVE_ROOM,
    ERROR,
    SKIP_QUESTION,
    SWITCH_QUESTION,
    END_QUIZ,
    START_QUIZ,
    ADMIN_ACTION_FEEDBACK,
    ANSWER_SUBMISSION,
    ANSWER_FEEDBACK,
    QUESTION_BROADCAST,
    QUIZ_RESULTS,
    CHAT_MESSAGE
}

public class Message {
    private String content;
    private String type;
    private String senderID;
    private String quizPIN;
    private boolean adminAction;

    public Message(String content, String type, String senderID, String quizPIN, boolean adminAction) {
        this.content = content;
        this.type = type;
        this.senderID = senderID;
        this.quizPIN = quizPIN;
        this.adminAction = adminAction;
    }
    public String getContent() {
        return content;
    }
    public String getType() {
        return type;
    }
    public String getSenderID() {
        return senderID;
    }
    public String getQuizPIN() {
        return quizPIN;
    }
    public boolean isAdminAction() {
        return adminAction;
    }
    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
    public static Message fromJson(String json) {
        Gson gson = new Gson();
        return gson.fromJson(json, Message.class);
    }
}
