// src/app/admin-dashboard/add-student/add-student.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService, StudentUser, Year } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  form!: FormGroup;
  loading = false;
  serverError = '';

  // backend Year enum values
  years: Year[] = ['FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FINAL_YEAR'];

  constructor(private fb: FormBuilder, private studentApi: StudentService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      rollNo: ['', [Validators.required, Validators.minLength(2)]],   // maps to collegeId
      department: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],                // optional (only if backend stores it)
      year: [''],                                                     // must be one of years[] or empty
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  get f() { return this.form.controls; }

  private passwordsMatch(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p && c && p === c ? null : { mismatch: true };
  }

  submit() {
    this.serverError = '';
    if (this.form.invalid || this.loading) return;

    const v = this.form.value;
    const payload: StudentUser = {
      name: v.name,
      email: v.email,
      collegeId: v.rollNo,           // 🔁 map UI field
      department: v.department,
      phone: v.phone || undefined,   // include only if backend accepts it
      year: (v.year || '') as Year,  // must match backend enum if provided
      role: 'STUDENT',               // enforce student role on FE
      password: v.password
    };

    this.loading = true;
    this.studentApi.create(payload).subscribe({
      next: () => {
        alert('Student added successfully ✅');
        this.form.reset();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.serverError = err?.error?.message || 'Failed to add student. Please try again.';
        this.loading = false;
      }
    });
  }
}
