package utils;

import java.util.List;

public class QuestionDTO {
    private String question;
    private int seconds;
    private int points;
    private List<AnswerDTO> answers;

    public QuestionDTO() {}

    public void setQuestion(String question) {
        this.question = question;
    }
    public String getQuestion() {
        return question;
    }
    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }
    public int getSeconds() {
        return seconds;
    }
    public void setPoints(int points) {
        this.points = points;
    }
    public int getPoints() {
        return points;
    }
    public void setAnswers(List<AnswerDTO> answers){
        this.answers = answers;
    }
    public List<AnswerDTO> getAnswers(){
        return answers;
    }
}
