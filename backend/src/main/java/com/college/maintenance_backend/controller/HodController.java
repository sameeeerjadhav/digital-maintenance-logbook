package com.college.maintenance_backend.controller;

import com.college.maintenance_backend.model.Department;
import com.college.maintenance_backend.model.Hod;
import com.college.maintenance_backend.security.JwtUtil;
import com.college.maintenance_backend.service.HodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/hod")

public class HodController {

    @Autowired
    private HodService hodService;

    @Autowired
    private JwtUtil jwtUtil; // ✅ Add JWT Utility

    // ➕ Add HOD
    @PostMapping("/add")
    public ResponseEntity<Hod> addHod(@RequestBody Hod hod) {
        return ResponseEntity.ok(hodService.addHod(hod));
    }

    // 🔐 HOD Login with JWT Token
    @PostMapping("/login")
    public ResponseEntity<?> loginHod(@RequestBody Hod loginRequest) {
        Hod hod = hodService.findByEmail(loginRequest.getEmail());

        if (hod == null) {
            return ResponseEntity.status(404).body(Map.of("message", "HOD not found"));
        }

        if (!hod.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid password"));
        }

        // ✅ Generate JWT Token
        String token = jwtUtil.generateToken(hod.getEmail(), "HOD");

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", hod.getEmail());
        response.put("role", "HOD");
        response.put("message", "Login successful");

        return ResponseEntity.ok(response);
    }

    // 📋 Get all HODs
    @GetMapping("/all")
    public ResponseEntity<List<Hod>> getAllHods() {
        return ResponseEntity.ok(hodService.getAllHods());
    }

    // 🔍 Get HOD by ID
    @GetMapping("/{id}")
    public ResponseEntity<Hod> getHodById(@PathVariable Long id) {
        return hodService.getHodById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✏ Update HOD
    @PutMapping("/{id}")
    public ResponseEntity<Hod> updateHod(@PathVariable Long id, @RequestBody Hod hod) {
        Hod updated = hodService.updateHod(id, hod);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // 🧩 Get HODs by Department
    @GetMapping("/by-department/{department}")
    public ResponseEntity<List<Hod>> getHodsByDepartment(@PathVariable String department) {
        try {
            Department deptEnum = Department.valueOf(department.toUpperCase());
            List<Hod> hods = hodService.getHodsByDepartment(deptEnum);
            return ResponseEntity.ok(hods);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(List.of()); // invalid department name
        }
    }

    // ❌ Delete HOD
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHod(@PathVariable Long id) {
        hodService.deleteHod(id);
        return ResponseEntity.noContent().build();
    }
}