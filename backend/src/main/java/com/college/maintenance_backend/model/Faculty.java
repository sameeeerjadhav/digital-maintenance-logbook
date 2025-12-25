package com.college.maintenance_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "faculty")
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String department;

    private String labName; // lab handled by the faculty

    private String password;

    private String collegeId;

    // Optional: reference to HOD (the one who added the faculty)
    private String addedByHodEmail;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.FACULTY;

    public Faculty() {}

    public Faculty(String name, String email, String department, String labName,
                   String password, String collegeId, String addedByHodEmail) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.labName = labName;
        this.password = password;
        this.collegeId = collegeId;
        this.addedByHodEmail = addedByHodEmail;
        this.role=role.FACULTY;
    }

    public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	// Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getDepartment() { return department; }

    public void setDepartment(String department) { this.department = department; }

    public String getLabName() { return labName; }

    public void setLabName(String labName) { this.labName = labName; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getCollegeId() { return collegeId; }

    public void setCollegeId(String collegeId) { this.collegeId = collegeId; }

    public String getAddedByHodEmail() { return addedByHodEmail; }

    public void setAddedByHodEmail(String addedByHodEmail) { this.addedByHodEmail = addedByHodEmail; }
}