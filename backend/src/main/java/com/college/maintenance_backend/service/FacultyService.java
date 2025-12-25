package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.Faculty;
import java.util.List;
import java.util.Optional;

public interface FacultyService {
    Faculty addFaculty(Faculty faculty);
    List<Faculty> getAllFaculty();
    Optional<Faculty> getFacultyById(Long id);
    Faculty updateFaculty(Long id, Faculty faculty);
    void deleteFaculty(Long id);
    Faculty findByEmail(String email);
    List<Faculty> getFacultyByDepartment(String department);
}