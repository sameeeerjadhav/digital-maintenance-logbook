package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.User;
import java.util.List;

public interface UserService {
    User registerUser(User user);
    User loginUser(String email, String password);
    List<User> getAllUsers();
    User getUserById(Long id);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
