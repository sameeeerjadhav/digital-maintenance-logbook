// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export type Year = 'FIRST_YEAR' | 'SECOND_YEAR' | 'THIRD_YEAR' | 'FINAL_YEAR';
export type Role = 'ADMIN' | 'HOD' | 'FACULTY' | 'STUDENT';

export interface StudentUser {
  id?: number;
  name: string;
  collegeId: string;   // your Roll No
  email: string;
  password?: string;
  department: string;
  year?: Year;
  role?: Role;
  phone?: string;      // keep only if backend stores it
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // Backend: GET /api/users
  getAll(): Observable<StudentUser[]> {
    return this.http.get<StudentUser[]>(`${this.baseUrl}`);
  }

  // Client-side filter for students (since backend doesn’t expose /students)
  getAllStudents(): Observable<StudentUser[]> {
    return this.getAll().pipe(
      map(list => (Array.isArray(list) ? list : []).filter(u => u.role === 'STUDENT'))
    );
  }

  // Backend: GET /api/users/{id}
  getById(id: number): Observable<StudentUser> {
    return this.http.get<StudentUser>(`${this.baseUrl}/${id}`);
  }

  // Backend: POST /api/users/signup
  create(data: StudentUser): Observable<StudentUser> {
    // ensure role is STUDENT
    const payload: StudentUser = { ...data, role: 'STUDENT' };
    return this.http.post<StudentUser>(`${this.baseUrl}/signup`, payload);
  }

  // Backend: PUT /api/users/{id}
  update(id: number, data: Partial<StudentUser>): Observable<StudentUser> {
    return this.http.put<StudentUser>(`${this.baseUrl}/${id}`, data);
  }

  // Backend: DELETE /api/users/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
