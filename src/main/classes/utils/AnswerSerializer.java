package utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import entities.Answer;

import java.lang.reflect.Type;

public class AnswerSerializer implements JsonSerializer<Answer> {
    @Override
    public JsonElement serialize(Answer answer, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", answer.getId());
        jsonAnswer.addProperty("answer_text", answer.getAnswer_text());
        jsonAnswer.addProperty("questionId", answer.getQuestion().getId());
        jsonAnswer.addProperty("correct", answer.isCorrect());
        return jsonAnswer;
    }
}

