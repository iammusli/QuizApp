package servlets;

import com.google.gson.Gson;
import dao.UserDAO;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            Gson gson = new Gson();
            String json = gson.toJson(userList);
            resp.getWriter().write(json);
        } else {
            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }
    }
}
