package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.Department;
import com.college.maintenance_backend.model.Hod;
import com.college.maintenance_backend.repository.HodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HodServiceImpl implements HodService {

    @Autowired
    private HodRepository hodRepository;

    @Override
    public Hod addHod(Hod hod) {
        return hodRepository.save(hod);
    }

    @Override
    public List<Hod> getAllHods() {
        return hodRepository.findAll();
    }

    @Override
    public Optional<Hod> getHodById(Long id) {
        return hodRepository.findById(id);
    }
    @Override
    public List<Hod> getHodsByDepartment(Department department) {
        return hodRepository.findByDepartment(department);
    }


    @Override
    public Hod updateHod(Long id, Hod updatedHod) {
        return hodRepository.findById(id).map(hod -> {
            hod.setName(updatedHod.getName());
            hod.setEmail(updatedHod.getEmail());
            hod.setPassword(updatedHod.getPassword());
            hod.setDepartment(updatedHod.getDepartment());
            hod.setCollegeId(updatedHod.getCollegeId());
            return hodRepository.save(hod);
        }).orElse(null);
    }

    @Override
    public void deleteHod(Long id) {
        hodRepository.deleteById(id);
    }

    @Override
    public Hod findByEmail(String email) {
        return hodRepository.findByEmail(email);
    }
}