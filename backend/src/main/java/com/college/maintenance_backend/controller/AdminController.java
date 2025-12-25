package com.college.maintenance_backend.controller;

import com.college.maintenance_backend.model.Admin;
import com.college.maintenance_backend.security.JwtUtil;
import com.college.maintenance_backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")

public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtil jwtUtil;

    // 🔹 Register Admin
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        try {
            Admin savedAdmin = adminService.createAdmin(admin);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Admin registered successfully!");
            response.put("admin", savedAdmin);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("message", "Error registering admin", "error", e.getMessage()));
        }
    }

    // 🔹 Admin Login
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin loginRequest) {
        Admin admin = adminService.findByEmail(loginRequest.getEmail()).orElse(null);

        if (admin == null) {
            return ResponseEntity.status(404).body(Map.of("message", "Admin not found"));
        }

        if (!admin.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid password"));
        }

        // ✅ Generate JWT Token
        String token = jwtUtil.generateToken(admin.getEmail(), "ADMIN");

        // ✅ Response with token and info
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", admin.getEmail());
        response.put("message", "Login successful");

        return ResponseEntity.ok(response);
    }

    // 🔹 CRUD Operations
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public Optional<Admin> getAdminById(@PathVariable Long id) {
        return adminService.getAdminById(id);
    }

    @PutMapping("/{id}")
    public Admin updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) {
        return adminService.updateAdmin(id, updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return "Admin deleted successfully";
    }
}