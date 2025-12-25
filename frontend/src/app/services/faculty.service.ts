import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export type Role = 'ADMIN' | 'HOD' | 'FACULTY' | 'STUDENT';
export type Year = 'FIRST_YEAR' | 'SECOND_YEAR' | 'THIRD_YEAR' | 'FINAL_YEAR';

export interface FacultyUser {
  id?: number;
  name: string;
  collegeId: string;   // use as Faculty/Employee ID
  email: string;
  password?: string;
  department: string;
  role?: Role;         // will be FACULTY on create
  // NOTE: backend User has 'year' field, but faculty won't send it
}

@Injectable({ providedIn: 'root' })
export class FacultyService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // GET /api/users -> filter to FACULTY
  getAllFaculty(): Observable<FacultyUser[]> {
    return this.http.get<FacultyUser[]>(`${this.baseUrl}`).pipe(
      map(list => (Array.isArray(list) ? list : []).filter(u => u.role === 'FACULTY'))
    );
  }

  getById(id: number): Observable<FacultyUser> {
    return this.http.get<FacultyUser>(`${this.baseUrl}/${id}`);
  }

  // POST /api/users/signup (force role = FACULTY)
  create(data: FacultyUser): Observable<FacultyUser> {
    const payload: FacultyUser = { ...data, role: 'FACULTY' };
    return this.http.post<FacultyUser>(`${this.baseUrl}/signup`, payload);
  }

  // PUT /api/users/{id}
  update(id: number, data: Partial<FacultyUser>): Observable<FacultyUser> {
    return this.http.put<FacultyUser>(`${this.baseUrl}/${id}`, data);
  }

  // DELETE /api/users/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
