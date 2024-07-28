package servlets;

import dao.UserDAO;
import entities.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.UserService;
import java.io.IOException;
import java.util.ArrayList;


@WebServlet ( name = "registrationServlet", value = "/register")
public class RegistrationServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private UserService userService;

    public RegistrationServlet() {
        super();
        userService = new UserService(new UserDAO());
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String confirmPassword = req.getParameter("confirmPassword");
        ArrayList<String> messages = new ArrayList<>();

        if(username == null || username.isEmpty()) {
            messages.add("Username is required");
        }
        if(password == null || password.isEmpty()) {
            messages.add("Password is required");
        }
        if(confirmPassword == null || confirmPassword.isEmpty()) {
            messages.add("Confirm Password is required");
        }
        if(confirmPassword != null && !confirmPassword.equals(password)) {
            messages.add("Passwords do not match");
        }
        if(messages.isEmpty()) {
            User user = new User(username, password);
            if(userService.findByUsername(user.getUsername()) == null) {
                userService.createUser(user);
                resp.sendRedirect(req.getContextPath() + "/login");
                return;
            } else {
                messages.add("User already exists");
            }
        }
        req.setAttribute("messages", messages.toString());
        System.out.println(messages);
        req.getRequestDispatcher("/registration.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
