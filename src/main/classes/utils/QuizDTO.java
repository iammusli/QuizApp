package utils;

import java.util.List;

public class QuizDTO {
    private String title;
    private String category;
    private List<QuestionDTO> questions;

    public QuizDTO() {}

    public void setTitle(String title) {
        this.title = title;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getTitle() {
        return title;
    }
    public String getCategory() {
        return category;
    }
    public void setQuestions(List<QuestionDTO> questions){
        this.questions = questions;
    }
    public List<QuestionDTO> getQuestions(){
        return questions;
    }
}
