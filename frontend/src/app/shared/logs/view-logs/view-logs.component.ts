import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogService } from '../../../services/log.service';
import { MaintenanceLog } from '../../../models/maintenance-log.model';

@Component({
  selector: 'app-view-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.css'],
})
export class ViewLogsComponent implements OnInit {
  searchTerm = '';
  logs: MaintenanceLog[] = [];
  loading = false;
  error = '';

  constructor(public logService: LogService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.error = '';
    this.logService.getAll().subscribe({
      next: (data) => {
        this.logs = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load maintenance logs.';
        this.loading = false;
      },
    });
  }

  get filteredLogs(): MaintenanceLog[] {
    const q = this.searchTerm.toLowerCase();
    return this.logs.filter((l) =>
      [
        l.id,
        l.machineName,
        l.issueDescription,
        l.actionTaken,
        l.status,
        l.maintenanceDate,
        // try to match whatever backend returns for related objects
        (l.device as any)?.deviceName,
        (l.device as any)?.name,
        (l.device as any)?.id,
        (l.faculty as any)?.name,
        (l.hod as any)?.name,
        (l.student as any)?.name,
        (l.faculty as any)?.id,
        (l.hod as any)?.id,
        (l.student as any)?.id,
      ]
        .filter((v) => v !== undefined && v !== null)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }

  // Optional: delete a log
  deleteLog(id: number) {
    if (!confirm('Delete this maintenance log?')) return;
    this.logService.delete(id).subscribe({
      next: () => (this.logs = this.logs.filter((x) => x.id !== id)),
      error: (err) => {
        console.error(err);
        alert('Failed to delete log.');
      },
    });
  }

  // Helper to pick an image source (prefer base64 from backend, else the /image/{filename} route)
  imageSrc(log: MaintenanceLog): string | null {
    if (log.imageBase64) return `data:image/jpeg;base64,${log.imageBase64}`;
    if (log.imagePath) return this.logService.getImageUrl(log.imagePath);
    return null;
  }
  getDeviceLabel(log: any): string {
  const d = log.device;
  if (!d) return '—';
  return d.deviceName || d.name || (d.id ? `#${d.id}` : '—');
}

getFacultyLabel(log: any): string {
  const f = log.faculty;
  if (!f) return '—';
  return f.name || (f.id ? `#${f.id}` : '—');
}

}
