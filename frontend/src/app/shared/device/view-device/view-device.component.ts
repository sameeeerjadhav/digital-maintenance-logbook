import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../../../services/device.service';
import { Device } from '../../../models/device.model';

@Component({
  selector: 'app-view-device',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css'],
})
export class ViewDeviceComponent implements OnInit {
  searchTerm = '';
  devices: Device[] = [];
  loading = false;
  error = '';

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.fetchDevices();
  }

  fetchDevices(): void {
    this.loading = true;
    this.error = '';
    this.deviceService.getAll().subscribe({
      next: (data) => {
        this.devices = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load devices. Please try again.';
        console.error(err);
      },
    });
  }

  get filteredDevices(): Device[] {
    const q = this.searchTerm.toLowerCase();
    return this.devices.filter((d) =>
      [
        d.id,
        d.deviceName,
        d.deviceType,
        d.serialNumber,
        d.labName,
        d.status,
      ]
        .filter((v) => v !== undefined && v !== null)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }

  deleteDevice(id: number | undefined): void {
    if (!id) return;
    const ok = confirm('Delete this device? This cannot be undone.');
    if (!ok) return;

    this.deviceService.delete(id).subscribe({
      next: () => {
        // Remove locally for a snappy UI
        this.devices = this.devices.filter((d) => d.id !== id);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete device.');
      },
    });
  }
}
