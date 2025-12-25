import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FacultyService, FacultyUser } from '../../services/faculty.service';

@Component({
  selector: 'app-add-faculty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent {
  // UI model (includes local labName but we won't send it to backend)
  faculty = {
    name: '',
    email: '',
    department: '',
    facultyId: '',     // maps to backend 'collegeId'
    password: '',
    confirmPassword: '',
    labName: ''        // NOTE: backend doesn't store this field
  };

  submitting = false;
  message = '';
  error = '';
  departments = ['CSE', 'AIML', 'BBA', 'MBA'];

  constructor(private facultyApi: FacultyService) {}

  onSubmit(form: NgForm) {
    this.message = '';
    this.error = '';
    if (this.submitting || !form.valid) return;

    if (this.faculty.password !== this.faculty.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    const payload: FacultyUser = {
      name: this.faculty.name,
      email: this.faculty.email,
      department: this.faculty.department,
      collegeId: this.faculty.facultyId, // map to backend
      password: this.faculty.password,
      role: 'FACULTY'
    };

    this.submitting = true;
    this.facultyApi.create(payload).subscribe({
      next: () => {
        this.message = 'Faculty added successfully ✅';
        form.resetForm();
        this.submitting = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Failed to add faculty.';
        this.submitting = false;
      }
    });
  }
}
