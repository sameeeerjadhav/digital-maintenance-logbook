export interface Hod {
  id: number;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  active: boolean;
  createdAt?: string; // ISO
  updatedAt?: string; // ISO
}
