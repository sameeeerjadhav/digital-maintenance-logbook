package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.*;
import com.college.maintenance_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceLogServiceImpl implements MaintenanceLogService {

    @Autowired
    private MaintenanceLogRepository maintenanceLogRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private HodRepository hodRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public MaintenanceLog addLog(MaintenanceLog log) {
        // Fetch full references
        if (log.getDevice() != null && log.getDevice().getId() != null)
            log.setDevice(deviceRepository.findById(log.getDevice().getId()).orElse(null));

        if (log.getFaculty() != null && log.getFaculty().getId() != null)
            log.setFaculty(facultyRepository.findById(log.getFaculty().getId()).orElse(null));

        if (log.getHod() != null && log.getHod().getId() != null)
            log.setHod(hodRepository.findById(log.getHod().getId()).orElse(null));

        if (log.getStudent() != null && log.getStudent().getId() != null)
            log.setStudent(userRepository.findById(log.getStudent().getId()).orElse(null));

        // 🔹 Handle image saving (Base64 -> file)
        if (log.getImageBase64() != null && !log.getImageBase64().isEmpty()) {
            try {
                byte[] imageBytes = Base64.getDecoder().decode(log.getImageBase64());
                String fileName = "maintenance_" + System.currentTimeMillis() + ".jpg";
                String uploadDir = "uploads/";

                java.io.File directory = new java.io.File(uploadDir);
                if (!directory.exists()) directory.mkdirs();

                java.nio.file.Path path = java.nio.file.Paths.get(uploadDir + fileName);
                java.nio.file.Files.write(path, imageBytes);

                log.setImagePath(path.toString()); // Save the file path in DB
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return maintenanceLogRepository.save(log);
    }

    @Override
    public List<MaintenanceLog> getAllLogs() {
        List<MaintenanceLog> logs = maintenanceLogRepository.findAll();
        logs.forEach(this::loadBase64Image); // ✅ Auto-load Base64 from file
        return logs;
    }

    @Override
    public Optional<MaintenanceLog> getLogById(Long id) {
        Optional<MaintenanceLog> log = maintenanceLogRepository.findById(id);
        log.ifPresent(this::loadBase64Image); // ✅ Auto-load Base64 for single log
        return log;
    }

    @Override
    public MaintenanceLog updateLog(Long id, MaintenanceLog updatedLog) {
        return maintenanceLogRepository.findById(id)
                .map(existing -> {
                    existing.setMachineName(updatedLog.getMachineName());

                    if (updatedLog.getDevice() != null && updatedLog.getDevice().getId() != null)
                        existing.setDevice(deviceRepository.findById(updatedLog.getDevice().getId()).orElse(null));

                    if (updatedLog.getFaculty() != null && updatedLog.getFaculty().getId() != null)
                        existing.setFaculty(facultyRepository.findById(updatedLog.getFaculty().getId()).orElse(null));

                    if (updatedLog.getHod() != null && updatedLog.getHod().getId() != null)
                        existing.setHod(hodRepository.findById(updatedLog.getHod().getId()).orElse(null));

                    if (updatedLog.getStudent() != null && updatedLog.getStudent().getId() != null)
                        existing.setStudent(userRepository.findById(updatedLog.getStudent().getId()).orElse(null));

                    existing.setMaintenanceDate(updatedLog.getMaintenanceDate());
                    existing.setIssueDescription(updatedLog.getIssueDescription());
                    existing.setActionTaken(updatedLog.getActionTaken());
                    existing.setStatus(updatedLog.getStatus());
                    existing.setRemarks(updatedLog.getRemarks());
                    existing.setImagePath(updatedLog.getImagePath());

                    return maintenanceLogRepository.save(existing);
                })
                .orElse(null);
    }

    @Override
    public void deleteLog(Long id) {
        maintenanceLogRepository.deleteById(id);
    }

    // ✅ Helper to convert stored image file → Base64 for GET requests
    private void loadBase64Image(MaintenanceLog log) {
        try {
            if (log.getImagePath() != null && !log.getImagePath().isEmpty()) {
                byte[] bytes = Files.readAllBytes(Paths.get(log.getImagePath()));
                log.setImageBase64(Base64.getEncoder().encodeToString(bytes));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}