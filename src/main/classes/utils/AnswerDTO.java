package utils;

public class AnswerDTO {
    private String answer_text;
    private boolean correct;

    public AnswerDTO() {}

    public void setAnswer_text(String answer_text) {
        this.answer_text = answer_text;
    }
    public String getAnswer_text() {
        return answer_text;
    }
    public void setCorrect(boolean correct) {
        this.correct = correct;
    }
    public boolean isCorrect() {
        return correct;
    }
}
