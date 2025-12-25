package com.college.maintenance_backend.repository;

import com.college.maintenance_backend.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    List<Faculty> findByDepartment(String department);
    Faculty findByEmail(String email);
}