import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../navbar/navbar.component'; // ✅ added

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavbarComponent], // ✅ added NavbarComponent
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  loading = false;
  serverError = '';

  roles = ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['STUDENT', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  submit() {
    this.serverError = '';
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        const role = this.form.value.role;
        this.navigateByRole(role);
      },
      error: (err) => {
        console.error(err);
        this.serverError = err?.error?.message || 'Login failed. Check your email, password, or role.';
        this.loading = false;
      }
    });
  }

  private navigateByRole(role: string) {
    switch ((role || '').toUpperCase()) {
      case 'ADMIN':   this.router.navigate(['/admin-dashboard']); break;
      case 'HOD':     this.router.navigate(['/hod-dashboard']); break;
      case 'FACULTY': this.router.navigate(['/faculty-dashboard']); break;
      case 'STUDENT': this.router.navigate(['/student-dashboard']); break;
      default:        this.router.navigate(['/login']); break;
    }
  }
}