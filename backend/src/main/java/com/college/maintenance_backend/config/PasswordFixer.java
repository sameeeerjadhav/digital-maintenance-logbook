package com.college.maintenance_backend.config;

import com.college.maintenance_backend.model.*;
import com.college.maintenance_backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class PasswordFixer implements CommandLineRunner {

    private final FacultyRepository facultyRepository;
    private final HodRepository hodRepository;
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordFixer(FacultyRepository facultyRepository,
                         HodRepository hodRepository,
                         AdminRepository adminRepository,
                         UserRepository userRepository,
                         PasswordEncoder passwordEncoder) {
        this.facultyRepository = facultyRepository;
        this.hodRepository = hodRepository;
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🔐 Encoding plain-text passwords...");

        encodeFaculty();
        encodeHod();
        encodeAdmin();
        encodeUser();

        System.out.println("✅ Password encoding completed successfully!");
    }

    private void encodeFaculty() {
        List<Faculty> facultyList = facultyRepository.findAll();
        for (Faculty f : facultyList) {
            if (!f.getPassword().startsWith("$2a$")) { // bcrypt check
                f.setPassword(passwordEncoder.encode(f.getPassword()));
                facultyRepository.save(f);
            }
        }
    }

    private void encodeHod() {
        List<Hod> hodList = hodRepository.findAll();
        for (Hod h : hodList) {
            if (!h.getPassword().startsWith("$2a$")) {
                h.setPassword(passwordEncoder.encode(h.getPassword()));
                hodRepository.save(h);
            }
        }
    }

    private void encodeAdmin() {
        List<Admin> adminList = adminRepository.findAll();
        for (Admin a : adminList) {
            if (!a.getPassword().startsWith("$2a$")) {
                a.setPassword(passwordEncoder.encode(a.getPassword()));
                adminRepository.save(a);
            }
        }
    }

    private void encodeUser() {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (!u.getPassword().startsWith("$2a$")) {
                u.setPassword(passwordEncoder.encode(u.getPassword()));
                userRepository.save(u);
            }
        }
    }
}