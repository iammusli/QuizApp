package servlets;

import dao.UserDAO;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import services.UserService;
import utils.UserSerializer;

import java.io.IOException;

@WebServlet(name = "userSettingsServlet", value = "/admin/settings")
public class UserSettingsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserService userService;

    public UserSettingsServlet() {
        super();
        this.userService = new UserService(new UserDAO());
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Entered UserSettingsServlet doGet");

        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
            System.out.println("User is not null");

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(User.class, new UserSerializer())
                    .create();

            System.out.println("User data to serialize: " + user);

            String json = gson.toJson(user);
            System.out.println("Generated JSON for UserSettingsServlet (GET): " + json);
            resp.getWriter().write(json);
        } else {
            System.out.println("User is null");

            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Entered UserSettingsServlet doPost");

        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
            System.out.println("User is not null");

            String newUsername = req.getParameter("username");
            String newPassword = req.getParameter("password");

            if (newUsername != null && !newUsername.isEmpty()) {
                user.setUsername(newUsername);
            }

            if (newPassword != null && !newPassword.isEmpty()) {
                user.setPassword(newPassword);
            }

            userService.updateUser(user);

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(User.class, new UserSerializer())
                    .create();

            String json = gson.toJson(user);
            resp.getWriter().write(json);
        } else {
            System.out.println("User is null");

            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }

}
