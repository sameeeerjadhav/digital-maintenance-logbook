package com.college.maintenance_backend.controller;

import com.college.maintenance_backend.model.Faculty;
import com.college.maintenance_backend.security.JwtUtil;
import com.college.maintenance_backend.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/faculty")

public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private JwtUtil jwtUtil; // ✅ JWT utility for token generation

    // ➕ Add new faculty
    @PostMapping("/add")
    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
        return ResponseEntity.ok(facultyService.addFaculty(faculty));
    }

    // 🔑 Faculty login (with JWT token)
    @PostMapping("/login")
    public ResponseEntity<?> loginFaculty(@RequestBody Faculty loginRequest) {
        Faculty faculty = facultyService.findByEmail(loginRequest.getEmail());

        if (faculty == null) {
            return ResponseEntity.status(404).body("Faculty not found");
        }

        if (!faculty.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        // ✅ Generate JWT token
        String token = jwtUtil.generateToken(faculty.getEmail(), "FACULTY");

        // ✅ Return token + faculty info
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("faculty", faculty);

        return ResponseEntity.ok(response);
    }

    // 📋 Get all faculty
    @GetMapping("/all")
    public ResponseEntity<List<Faculty>> getAllFaculty() {
        return ResponseEntity.ok(facultyService.getAllFaculty());
    }

    // 🔍 Get faculty by ID
    @GetMapping("/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🏫 Get faculty by Department
    @GetMapping("/by-department/{department}")
    public ResponseEntity<List<Faculty>> getFacultyByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(facultyService.getFacultyByDepartment(department));
    }

    // ✏ Update faculty
    @PutMapping("/{id}")
    public ResponseEntity<Faculty> updateFaculty(@PathVariable Long id, @RequestBody Faculty faculty) {
        Faculty updated = facultyService.updateFaculty(id, faculty);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // ❌ Delete faculty
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }
}