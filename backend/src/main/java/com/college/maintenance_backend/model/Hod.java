package com.college.maintenance_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hod")
public class Hod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Department department;

    private String collegeId;

    @Enumerated(EnumType.STRING)
    private Role role = Role.HOD; // ✅ Default role

    public Hod() {}

    public Hod(String name, String email, String password, Department department, String collegeId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
        this.collegeId = collegeId;
        this.role = Role.HOD;
    }

    // ✅ Getters and Setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}