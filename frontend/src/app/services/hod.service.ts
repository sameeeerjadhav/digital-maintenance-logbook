import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hod {
  id?: number;
  name: string;
  email: string;
  password?: string;
  department: string; // Enum string from backend
  collegeId?: string;
}

@Injectable({ providedIn: 'root' })
export class HodService {
  private baseUrl = 'http://localhost:8080/api/hod'; // ✅ corrected path

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hod[]> {
    return this.http.get<Hod[]>(`${this.baseUrl}/all`);
  }

  getById(id: number): Observable<Hod> {
    return this.http.get<Hod>(`${this.baseUrl}/${id}`);
  }

  create(data: Hod): Observable<Hod> {
    return this.http.post<Hod>(`${this.baseUrl}/add`, data);
  }

  update(id: number, data: Partial<Hod>): Observable<Hod> {
    return this.http.put<Hod>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}