package com.college.maintenance_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.college.maintenance_backend.model.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
}