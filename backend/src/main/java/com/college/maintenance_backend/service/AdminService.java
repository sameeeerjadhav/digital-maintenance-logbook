package com.college.maintenance_backend.service;

import com.college.maintenance_backend.model.Admin;
import java.util.List;
import java.util.Optional;

public interface AdminService {
    Admin createAdmin(Admin admin);
    List<Admin> getAllAdmins();
    Optional<Admin> getAdminById(Long id);
    Admin updateAdmin(Long id, Admin updatedAdmin);
    void deleteAdmin(Long id);
    Optional<Admin> findByEmail(String email);
}