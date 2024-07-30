package servlets;

import dao.UserDAO;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import services.UserService;

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
        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            Gson gson = new Gson();
            String json = gson.toJson(user);
            resp.getWriter().write(json);
        } else {
            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = (User) req.getSession().getAttribute("user");
        if (user != null) {
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
            resp.getWriter().write(new Gson().toJson(user));
        } else {
            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }

}
