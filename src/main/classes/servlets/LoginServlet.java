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

@WebServlet (name = "loginServlet" , value = "/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 2L;
    private UserService userService;

    public LoginServlet() {
        super();
        userService = new UserService( new UserDAO());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        ArrayList<String> messages = new ArrayList<>();

        if(username == null || username.isEmpty()){
            messages.add("Username is empty");
        }
        if(password == null || password.isEmpty()){
            messages.add("Password is empty");
        }
        if(messages.isEmpty()){
            if(username.equals("admin") && password.equals("admin")){
                User admin = new User();
                admin.setUsername("admin");
                admin.setAdmin(true);
                request.getSession().setAttribute("user", admin);
                response.sendRedirect(request.getContextPath() + "/home/admin");
                return;
            } else {
                User user = userService.authenticate(username, password);
                if(user != null){
                    request.getSession().setAttribute("user", user);
                    response.sendRedirect(request.getContextPath() + "/admin/home");
                    return;
                } else {
                    messages.add("Unknown login attempt");
                }
            }
        }
        request.setAttribute("messages", messages.toString());
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
