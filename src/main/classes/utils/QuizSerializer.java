package utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import entities.Quiz;

import java.lang.reflect.Type;

public class QuizSerializer implements JsonSerializer<Quiz> {
    @Override
    public JsonElement serialize(Quiz quiz, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject jsonQuiz = new JsonObject();
        jsonQuiz.addProperty("id", quiz.getId());
        jsonQuiz.add("owner", context.serialize(quiz.getOwner()));
        jsonQuiz.addProperty("title", quiz.getTitle());
        jsonQuiz.addProperty("category", quiz.getCategory());
        jsonQuiz.add("questions", context.serialize(quiz.getQuestions()));
        return jsonQuiz;
    }
}

