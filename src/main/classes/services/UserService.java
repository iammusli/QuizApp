package services;

import dao.UserDAO;
import entities.User;
import utils.SecurityUtil;

public class UserService {
    private UserDAO userDAO;

    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    public boolean createUser(User user) {
        user.setPassword(SecurityUtil.hashPassword(user.getPassword()));
        return userDAO.createUser(user);
    }

    public void updateUser(User user) {
        user.setPassword(SecurityUtil.hashPassword(user.getPassword()));
        userDAO.updateUser(user);
    }

    public User findByUsername(String username) {
        return userDAO.findUserByUsername(username);
    }
    public User authenticate(String username, String password) {
        User user = userDAO.findUserByUsername(username);
        if(user == null){
            return null;
        }
        if(SecurityUtil.checkPassword(password, user.getPassword())){
            user.setPassword("");
            return user;
        }
        return null;
    }

}
