package com.college.maintenance_backend.repository;

import com.college.maintenance_backend.model.Hod;

import com.college.maintenance_backend.model.Department;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HodRepository extends JpaRepository<Hod, Long> {
    Hod findByEmail(String email);
    List<Hod> findByDepartment(Department department);
}
