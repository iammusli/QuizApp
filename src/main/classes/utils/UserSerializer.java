package utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import entities.User;

import java.lang.reflect.Type;

public class UserSerializer implements JsonSerializer<User> {
    @Override
    public JsonElement serialize(User user, Type typeOfSrc, JsonSerializationContext context) {
        System.out.println("Serializing user: " + user.getUsername());
        JsonObject jsonUser = new JsonObject();
        jsonUser.addProperty("id", user.getId());
        jsonUser.addProperty("username", user.getUsername());
        jsonUser.addProperty("isAdmin", user.isAdmin());
        jsonUser.add("quizzes", context.serialize(user.getQuizzes()));
        return jsonUser;
    }
}

