import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Device } from '../models/device.model'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private baseUrl = 'http://localhost:8080/api/devices';

  constructor(private http: HttpClient) {}

  // ✅ Helper: Get Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ✅ Create device -> POST /api/devices/add
  create(device: Omit<Device, 'id' | 'createdAt' | 'updatedAt'>): Observable<Device> {
    const headers = this.getAuthHeaders();
    return this.http.post<Device>(`${this.baseUrl}/add`, device, { headers });
  }

  // ✅ Get all devices -> GET /api/devices/all
  getAll(): Observable<Device[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Device[]>(`${this.baseUrl}/all`, { headers });
  }

  // ✅ Get device by ID
  getById(id: number): Observable<Device> {
    const headers = this.getAuthHeaders();
    return this.http.get<Device>(`${this.baseUrl}/${id}`, { headers });
  }

  // ✅ Update device
  update(id: number, device: Partial<Device>): Observable<Device> {
    const headers = this.getAuthHeaders();
    return this.http.put<Device>(`${this.baseUrl}/update/${id}`, device, { headers });
  }

  // ✅ Delete device
  delete(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers });
  }

  // ---------- Optional QR helpers ----------
  findBySerial(serial: string) {
    const needle = (serial || '').toLowerCase();
    return this.getAll().pipe(
      map(list => (Array.isArray(list) ? list : []).find(d =>
        (d.serialNumber || '').toLowerCase() === needle
      ) || null)
    );
  }

  findFromQrPayload(payload: string) {
    try {
      const query = payload.includes('?') ? payload.split('?')[1] : payload;
      const params = new URLSearchParams(query);
      const sn = params.get('deviceSN');
      if (sn) return this.findBySerial(sn);
    } catch {
      // ignore and fall through
    }
    return this.findBySerial(payload);
  }
}