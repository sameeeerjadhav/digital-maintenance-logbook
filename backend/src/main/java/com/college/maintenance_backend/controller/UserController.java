package com.college.maintenance_backend.controller;

import com.college.maintenance_backend.model.User;
import com.college.maintenance_backend.security.JwtUtil;
import com.college.maintenance_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // 🔹 Signup
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully!", "user", savedUser));
    }

    // 🔹 Login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existing = userService.loginUser(user.getEmail(), user.getPassword());
        if (existing == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        // Generate token
        String token = jwtUtil.generateToken(existing.getEmail(), existing.getRole().toString());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", existing,
                "message", "Login successful"
        ));
    }

    // 🔹 Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 🔹 Get by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 🔹 Update
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // 🔹 Delete
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}