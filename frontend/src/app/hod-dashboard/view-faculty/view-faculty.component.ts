import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacultyService, FacultyUser } from '../../services/faculty.service';

@Component({
  selector: 'app-view-faculty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-faculty.component.html',
  styleUrls: ['./view-faculty.component.css']
})
export class ViewFacultyComponent implements OnInit {
  loading = false;
  error = '';
  faculties: FacultyUser[] = [];
  filtered: FacultyUser[] = [];
  search = '';

  constructor(private facultyApi: FacultyService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.error = '';
    this.facultyApi.getAllFaculty().subscribe({
      next: (data) => {
        this.faculties = Array.isArray(data) ? data : [];
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Failed to fetch faculty.';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const q = (this.search || '').toLowerCase().trim();
    if (!q) { this.filtered = [...this.faculties]; return; }

    this.filtered = this.faculties.filter(f => {
      const name = (f?.name || '').toLowerCase();
      const email = (f?.email || '').toLowerCase();
      const id = (f?.collegeId || '').toLowerCase(); // Faculty ID
      const dept = (f?.department || '').toLowerCase();
      return name.includes(q) || email.includes(q) || id.includes(q) || dept.includes(q);
    });
  }

  onSearchChange(): void { this.applyFilter(); }

  delete(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Delete this faculty? This action cannot be undone.')) return;

    this.loading = true;
    this.facultyApi.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Failed to delete faculty.';
        this.loading = false;
      }
    });
  }

  trackById = (_: number, row: FacultyUser) => row?.id ?? _;
}
