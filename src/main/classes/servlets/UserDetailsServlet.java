package servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dao.UserDAO;
import entities.Answer;
import entities.Question;
import entities.Quiz;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import utils.AnswerSerializer;
import utils.QuestionSerializer;
import utils.QuizSerializer;
import utils.UserSerializer;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "profileServlet", value = "/admin/profile")
public class UserDetailsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Entered UserDetailsServlet doGet");

        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
            System.out.println("User is not null");

            UserDAO userDao = new UserDAO();
            List<User> userList = userDao.findAllUsers();

            for (User u : userList) {
                String password = u.getPassword();
                String hiddenPassword = new String(new char[password.length()]).replace('\0', '*');
                u.setPassword(hiddenPassword);
            }

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            GsonBuilder gsonBuilder = new GsonBuilder();
            gsonBuilder.excludeFieldsWithoutExposeAnnotation();
            gsonBuilder.registerTypeAdapter(User.class, new UserSerializer());
            Gson gson = gsonBuilder.create();

            System.out.println("User list data to serialize: " + userList);

            String json = gson.toJson(userList);
            System.out.println("Generated JSON for UserDetailsServlet (GET): " + json);

            resp.getWriter().write(json);
        } else {
            System.out.println("User is null");

            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Entered UserDetailsServlet doPost");

        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
            System.out.println("User is not null");

            BufferedReader reader = req.getReader();
            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

            int userId = jsonObject.get("id").getAsInt();
            String newUsername = jsonObject.get("username").getAsString();
            String newPassword = jsonObject.get("password").getAsString();

            UserDAO userDao = new UserDAO();
            User updatedUser = userDao.findUserById(userId);
            if (updatedUser != null) {
                updatedUser.setUsername(newUsername);
                if (!newPassword.isEmpty()) {
                    String hashedPassword = org.mindrot.jbcrypt.BCrypt.hashpw(newPassword, org.mindrot.jbcrypt.BCrypt.gensalt());
                    updatedUser.setPassword(hashedPassword);
                }
                userDao.updateUser(updatedUser);
                System.out.println("Profile updated successfully");

                resp.setStatus(HttpServletResponse.SC_OK);
                resp.getWriter().write("Profile updated successfully");
            } else {
                System.out.println("User not found");

                resp.sendError(HttpServletResponse.SC_NOT_FOUND, "User not found");
            }
        } else {
            System.out.println("User is null");

            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }
}
