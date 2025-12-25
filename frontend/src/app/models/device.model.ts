// src/app/models/device.model.ts
export enum DeviceType {
  COMPUTER = 'COMPUTER',
  PROJECTOR = 'PROJECTOR',
  PRINTER = 'PRINTER',
  ROUTER = 'ROUTER',
  SWITCH = 'SWITCH',
  UPS = 'UPS',
  FAN = 'FAN',
  LIGHT = 'LIGHT',
}

// Backend keeps status as a free string.
// Use a union to guide UI while staying compatible.
export type DeviceStatus = 'Working' | 'Under Maintenance' | 'Faulty' | string;

export interface Device {
  id?: number;
  deviceName: string;
  deviceType: DeviceType;
  serialNumber: string;
  labName: string;
  status: DeviceStatus;
  qrCodePath?: string;
  createdAt?: string;  // ISO string from backend
  updatedAt?: string;  // ISO string from backend
}
