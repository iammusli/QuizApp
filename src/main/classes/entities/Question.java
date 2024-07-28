package entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "question")
public class Question {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @Column ( name = "time", nullable = false )
    private int seconds;

    @Column ( name = "points", nullable = false)
    private int points;

    @Column (name = "question_text", nullable = false)
    private String question;

    @ManyToOne
    private Quiz quiz;

    @OneToMany (mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Answer> answers = new ArrayList<>();

    public Question() {}

    public Question(int seconds, int points, String question, Quiz quiz) {
        this.seconds = seconds;
        this.points = points;
        this.question = question;
        this.quiz = quiz;
    }
    public int getId() {
        return id;
    }
    public int getSeconds() {
        return seconds;
    }
    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }
    public int getPoints() {
        return points;
    }
    public void setPoints(int points) {
        this.points = points;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public Quiz getQuiz() {
        return quiz;
    }
    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
    public List<Answer> getAnswers() {
        return answers;
    }
    public Question addAnswer(Answer answer) {
        answers.add(answer);
        answer.setQuestion(this);
        return this;
    }
}
