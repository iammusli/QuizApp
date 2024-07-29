package entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table ( name = "quiz")
public class Quiz {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    
    private int id;

    @OneToOne
    
    private User owner;

    @Column (name = "title", nullable = false)
    
    private String title;

    @OneToMany (mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    
    private List<Question> questions = new ArrayList<>();

    public Quiz() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public void setOwner(User owner) {
        this.owner = owner;
    }
    public User getOwner() {
        return owner;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getTitle() {
        return title;
    }
    public Quiz addQuestion(Question question) {
        questions.add(question);
        question.setQuiz(this);
        return this;
    }
    public List<Question> getQuestions() {
        return questions;
    }
    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
