// src/app/models/maintenance-log.model.ts
export type LogStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | string;

export interface MaintenanceLogPayload {
  machineName: string;
  device: { id: number };          // required
  faculty?: { id: number } | null; // optional
  hod?: { id: number } | null;     // optional
  student?: { id: number } | null; // optional
  maintenanceDate: string;         // "YYYY-MM-DD"
  issueDescription: string;
  actionTaken?: string;
  status: LogStatus;               // must match backend enum strings
  remarks?: string;
  imageBase64?: string;            // raw base64 (no data:... prefix)
}

export interface MaintenanceLog extends MaintenanceLogPayload {
  id: number;
  imagePath?: string | null;
}
