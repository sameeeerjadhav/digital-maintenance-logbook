package com.college.maintenance_backend.repository;

import com.college.maintenance_backend.model.MaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {
    List<MaintenanceLog> findByStatus(String status);
    List<MaintenanceLog> findByMachineName(String machineName);
}