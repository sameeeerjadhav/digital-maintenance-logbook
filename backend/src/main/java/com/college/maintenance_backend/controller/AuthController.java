package com.college.maintenance_backend.controller;

import com.college.maintenance_backend.model.*;
import com.college.maintenance_backend.repository.*;
import com.college.maintenance_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AdminRepository adminRepository;
    @Autowired private FacultyRepository facultyRepository;
    @Autowired private HodRepository hodRepository;
    @Autowired private UserRepository userRepository; // for Student + default
    @Autowired private JwtUtil jwtUtil;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String role = request.get("role");

        if (email == null || password == null || role == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email, password, and role are required"));
        }

        Object user = null;
        String encodedPassword = null;

        switch (role.toUpperCase()) {
            case "ADMIN" -> {
                Optional<Admin> admin = adminRepository.findByEmail(email);
                if (admin.isPresent()) {
                    user = admin.get();
                    encodedPassword = admin.get().getPassword();
                }
            }
            case "HOD" -> {
                Hod hod = hodRepository.findByEmail(email);
                if (hod != null) {
                    user = hod;
                    encodedPassword = hod.getPassword();
                }
            }
            case "FACULTY" -> {
                Faculty faculty = facultyRepository.findByEmail(email);
                if (faculty != null) {
                    user = faculty;
                    encodedPassword = faculty.getPassword();
                }
            }
            case "STUDENT" -> {
                Optional<User> studentOpt = userRepository.findByEmail(email);
                if (studentOpt.isPresent()) {
                    User student = studentOpt.get();
                    user = student;
                    encodedPassword = student.getPassword();
                }
            }
            default -> {
                Optional<User> normalUser = userRepository.findByEmail(email);
                if (normalUser.isPresent()) {
                    user = normalUser.get();
                    encodedPassword = normalUser.get().getPassword();
                }
            }
        }

        if (user == null || encodedPassword == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or role"));
        }

        if (!passwordEncoder.matches(password, encodedPassword)) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid password"));
        }

        // ✅ Generate JWT
        String token = jwtUtil.generateToken(email, role.toUpperCase());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", email,
                "role", role.toUpperCase(),
                "message", "Login successful"
        ));
    }
}