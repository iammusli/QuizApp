package servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dao.UserDAO;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.mindrot.jbcrypt.BCrypt;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "profileServlet", value = "/admin/profile")
public class UserDetailsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
            UserDAO userDao = new UserDAO();
            List<User> userList = userDao.findAllUsers();

            for (User u : userList) {
                String password = u.getPassword();
                String hiddenPassword = new String(new char[password.length()]).replace('\0', '*');
                u.setPassword(hiddenPassword);
            }

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            Gson gson = new Gson();
            String json = gson.toJson(userList);
            resp.getWriter().write(json);
        } else {
            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
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
                    // Hash the new password before saving
                    String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
                    updatedUser.setPassword(hashedPassword);
                }
                userDao.updateUser(updatedUser);

                resp.setStatus(HttpServletResponse.SC_OK);
                resp.getWriter().write("Profile updated successfully");
            } else {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND, "User not found");
            }
        } else {
            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }
}
