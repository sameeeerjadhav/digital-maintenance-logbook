import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api'; // Spring Boot base URL

  constructor(private http: HttpClient) {}

  // ---------- LOGIN ----------
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('email', response.email);
        }
      })
    );
  }

  // ---------- SIGNUP (for student) ----------
  signupStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup/student`, data);
  }

  // ---------- LOGOUT ----------
  logout() {
    localStorage.clear();
  }

  // ---------- TOKEN HELPERS ----------
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}