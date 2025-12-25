// src/app/admin-dashboard/view-students/view-students.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService, StudentUser } from '../../services/student.service';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  loading = false;
  error = '';
  students: StudentUser[] = [];
  filtered: StudentUser[] = [];
  search = '';

  constructor(private studentApi: StudentService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    // client-side filter by role since backend lists all users at GET /api/users
    this.studentApi.getAll().subscribe({
      next: (data) => {
        const list = Array.isArray(data) ? data : [];
        this.students = list.filter(u => u.role === 'STUDENT');
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Failed to fetch students.';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const q = (this.search || '').toLowerCase().trim();
    if (!q) { this.filtered = [...this.students]; return; }

    this.filtered = this.students.filter(s => {
      const name = (s?.name || '').toLowerCase();
      const email = (s?.email || '').toLowerCase();
      const id = (s?.collegeId || '').toLowerCase(); // <-- collegeId
      const dept = (s?.department || '').toLowerCase();
      const phone = (s?.phone || '').toLowerCase();
      return name.includes(q) || email.includes(q) || id.includes(q) || dept.includes(q) || phone.includes(q);
    });
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  delete(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Delete this student? This action cannot be undone.')) return;

    this.loading = true;
    this.studentApi.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Failed to delete student.';
        this.loading = false;
      }
    });
  }

  trackById = (_: number, row: StudentUser) => row?.id ?? _;
}
