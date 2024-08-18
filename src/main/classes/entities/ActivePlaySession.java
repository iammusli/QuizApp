package entities;


import jakarta.persistence.*;

@Entity
@Table (name = "sessions")
public class ActivePlaySession {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int quizPIN;
    @Column ( name = "quizID")
    private int quizID;
    @Column ( name = "adminID")
    private int adminID;

    public ActivePlaySession(int quizID, int adminID, int quizPIN) {
        this.quizID = quizID;
        this.adminID = adminID;
        this.quizPIN = quizPIN;
    }

    public ActivePlaySession() {}

    public int getQuizPIN() {
        return quizPIN;
    }
    public void setQuizPIN(int quizPIN) {
        this.quizPIN = quizPIN;
    }
    public int getQuizID() {
        return quizID;
    }
    public void setQuizID(int quizID) {
        this.quizID = quizID;
    }
    public int getAdminID() {
        return adminID;
    }
    public void setAdminID(int adminID) {
        this.adminID = adminID;
    }
}
