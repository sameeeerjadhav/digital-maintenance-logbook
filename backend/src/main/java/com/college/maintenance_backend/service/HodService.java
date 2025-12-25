package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.Hod;
import java.util.List;
import java.util.Optional;
import com.college.maintenance_backend.model.Department;
import java.util.List;

public interface HodService {
    Hod addHod(Hod hod);
    List<Hod> getAllHods();
    Optional<Hod> getHodById(Long id);
    Hod updateHod(Long id, Hod hod);
    void deleteHod(Long id);
    Hod findByEmail(String email);
    List<Hod> getHodsByDepartment(Department department);
}