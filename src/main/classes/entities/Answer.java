package entities;


import com.google.gson.annotations.Expose;
import jakarta.persistence.*;

@Entity
@Table (name = "answer")
public class Answer {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    
    private int id;

    @Column (name = "answer_text", nullable = false)
    
    private String answer_text;

    @ManyToOne
    
    private Question question;

    @Column (name = "correct", nullable = false)
    
    private boolean correct;

    public Answer() {}
    public Answer(String answer_text, Question question, boolean correct) {
        this.answer_text = answer_text;
        this.question = question;
        this.correct = correct;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {}
    public String getAnswer_text() {
        return answer_text;
    }
    public void setAnswer_text(String answer_text) {
        this.answer_text = answer_text;
    }
    public Question getQuestion() {
        return question;
    }
    public void setQuestion(Question question) {
        this.question = question;
    }
    public boolean isCorrect() {
        return correct;
    }
    public void setCorrect(boolean correct) {
        this.correct = correct;
    }
}
