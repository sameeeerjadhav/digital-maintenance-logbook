import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../navbar/navbar.component'; // ✅ added

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavbarComponent], // ✅ added NavbarComponent
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form!: FormGroup;
  loading = false;
  serverError = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      collegeId: ['', [Validators.required]],
      department: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }

  get f() { return this.form.controls; }

  submit() {
    this.serverError = '';
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.auth.signupStudent(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error(err);
        this.serverError = err?.error?.message || 'Signup failed. Please try again.';
        this.loading = false;
      }
    });
  }
}