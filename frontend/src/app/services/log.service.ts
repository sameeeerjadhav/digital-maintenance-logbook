import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaintenanceLog, MaintenanceLogPayload } from '../models/maintenance-log.model';

@Injectable({ providedIn: 'root' })
export class LogService {
  private baseUrl = 'http://localhost:8080/api/maintenance';

  constructor(private http: HttpClient) {}

  create(payload: MaintenanceLogPayload): Observable<MaintenanceLog> {
    return this.http.post<MaintenanceLog>(`${this.baseUrl}/add`, payload);
  }

  getAll(): Observable<MaintenanceLog[]> {
    return this.http.get<MaintenanceLog[]>(`${this.baseUrl}/all`);
  }

  getById(id: number): Observable<MaintenanceLog> {
    return this.http.get<MaintenanceLog>(`${this.baseUrl}/${id}`);
  }

  update(id: number, payload: Partial<MaintenanceLogPayload>): Observable<MaintenanceLog> {
    return this.http.put<MaintenanceLog>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /** Backend serves /image/{filename} */
  getImageUrl(filename: string): string {
    return `${this.baseUrl}/image/${encodeURIComponent(filename)}`;
  }
}
