package utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import entities.Question;

import java.lang.reflect.Type;

public class QuestionSerializer implements JsonSerializer<Question> {
    @Override
    public JsonElement serialize(Question question, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject jsonQuestion = new JsonObject();
        jsonQuestion.addProperty("id", question.getId());
        jsonQuestion.addProperty("seconds", question.getSeconds());
        jsonQuestion.addProperty("points", question.getPoints());
        jsonQuestion.addProperty("question", question.getQuestion());
        jsonQuestion.add("answers", context.serialize(question.getAnswers()));
        jsonQuestion.addProperty("quizId", question.getQuiz().getId());
        return jsonQuestion;
    }
}

