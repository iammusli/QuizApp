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

    @Column ( name="category" )
    private String category;

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
    public void setCategory(String category) {
        this.category = category;
    }
    public String getCategory() {
        return category;
    }
    public void addQuestion(Question question) {
        questions.add(question);
        question.setQuiz(this);
    }
    public List<Question> getQuestions() {
        return questions;
    }
    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
