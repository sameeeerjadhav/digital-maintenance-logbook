package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.Faculty;
import com.college.maintenance_backend.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public Faculty addFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    @Override
    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    @Override
    public Optional<Faculty> getFacultyById(Long id) {
        return facultyRepository.findById(id);
    }

    @Override
    public Faculty updateFaculty(Long id, Faculty updatedFaculty) {
        return facultyRepository.findById(id).map(faculty -> {
            faculty.setName(updatedFaculty.getName());
            faculty.setEmail(updatedFaculty.getEmail());
            faculty.setDepartment(updatedFaculty.getDepartment());
            faculty.setLabName(updatedFaculty.getLabName());
            faculty.setPassword(updatedFaculty.getPassword());
            faculty.setCollegeId(updatedFaculty.getCollegeId());
            faculty.setAddedByHodEmail(updatedFaculty.getAddedByHodEmail());
            return facultyRepository.save(faculty);
        }).orElse(null);
    }

    @Override
    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }

    @Override
    public Faculty findByEmail(String email) {
        return facultyRepository.findByEmail(email);
    }

    @Override
    public List<Faculty> getFacultyByDepartment(String department) {
        return facultyRepository.findByDepartment(department);
    }
}