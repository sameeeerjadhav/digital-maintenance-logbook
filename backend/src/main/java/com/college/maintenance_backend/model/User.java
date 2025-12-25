package com.college.maintenance_backend.model;



	import jakarta.persistence.*;

	@Entity
	@Table(name = "users")
	public class User {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @Column(unique = true)
	    private String name;
	    
	    @Column(unique = true)
	    private String collegeId;
	    
	    @Column(unique = true)
	    private String email;
	    
	    @Column(unique = true)
	    private String password;
	    
	    
	    private String department;

	    @Enumerated(EnumType.STRING)
	    private Year year;

	    @Enumerated(EnumType.STRING)
	    private Role role;

	    // Getters & Setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }

	    public String getName() { return name; }
	    public void setName(String name) { this.name = name; }

	    public String getCollegeId() { return collegeId; }
	    public void setCollegeId(String collegeId) { this.collegeId = collegeId; }

	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }

	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }

	    public String getDepartment() { return department; }
	    public void setDepartment(String department) { this.department = department; }

	    public Year getYear() { return year; }
	    public void setYear(Year year) { this.year = year; }

	    public Role getRole() { return role; }
	    public void setRole(Role role) { this.role = role; }
	}


