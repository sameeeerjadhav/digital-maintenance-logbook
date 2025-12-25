package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.MaintenanceLog;

import java.util.List;
import java.util.Optional;

public interface MaintenanceLogService {

    MaintenanceLog addLog(MaintenanceLog log);

    List<MaintenanceLog> getAllLogs();

    Optional<MaintenanceLog> getLogById(Long id);

    MaintenanceLog updateLog(Long id, MaintenanceLog updatedLog);

    void deleteLog(Long id);
}