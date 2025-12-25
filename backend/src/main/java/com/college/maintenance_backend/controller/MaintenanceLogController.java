package com.college.maintenance_backend.controller;

import com.college.maintenance_backend.model.MaintenanceLog;
import com.college.maintenance_backend.service.MaintenanceLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance")

public class MaintenanceLogController {

    @Autowired
    private MaintenanceLogService maintenanceLogService;

    private static final String UPLOAD_DIR = "uploads/";

    // -------------------- ADD LOG --------------------
    @PostMapping("/add")
    public ResponseEntity<MaintenanceLog> addLog(@RequestBody MaintenanceLog log) {
        try {
            if (log.getImageBase64() != null && !log.getImageBase64().isEmpty()) {
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                byte[] imageBytes = Base64.getDecoder().decode(log.getImageBase64());
                String fileName = System.currentTimeMillis() + ".jpg";
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                Files.write(filePath, imageBytes);
                log.setImagePath(fileName);
            }

            MaintenanceLog saved = maintenanceLogService.addLog(log);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // -------------------- GET ALL --------------------
    @GetMapping("/all")
    public ResponseEntity<List<MaintenanceLog>> getAllLogs() {
        return ResponseEntity.ok(maintenanceLogService.getAllLogs());
    }

    // -------------------- GET BY ID --------------------
    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceLog> getLogById(@PathVariable Long id) {
        return maintenanceLogService.getLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // -------------------- UPDATE LOG --------------------
    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceLog> updateLog(@PathVariable Long id, @RequestBody MaintenanceLog updatedLog) {
        try {
            if (updatedLog.getImageBase64() != null && !updatedLog.getImageBase64().isEmpty()) {
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                byte[] imageBytes = Base64.getDecoder().decode(updatedLog.getImageBase64());
                String fileName = System.currentTimeMillis() + ".jpg";
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                Files.write(filePath, imageBytes);
                updatedLog.setImagePath(fileName);
            }

            MaintenanceLog updated = maintenanceLogService.updateLog(id, updatedLog);
            return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // -------------------- GET IMAGE --------------------
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path imagePath = Paths.get(UPLOAD_DIR + filename);
        Resource resource = new UrlResource(imagePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    // -------------------- DELETE LOG --------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        maintenanceLogService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
}