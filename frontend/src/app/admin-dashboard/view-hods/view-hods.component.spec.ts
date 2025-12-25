import { Component, OnInit } from '@angular/core';
import { HodService, Hod } from '../../services/hod.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-hods',
  standalone: true,
  templateUrl: './view-hods.component.html',
  styleUrls: ['./view-hods.component.css']
})
export class ViewHodsComponent implements OnInit {
  hodList: Hod[] = [];
  loading = false;
  errorMessage = '';

  constructor(private hodService: HodService, private router: Router) {}

  ngOnInit() {
    this.loadHods();
  }

  loadHods() {
    this.loading = true;
    this.hodService.getAll().subscribe({
      next: (data) => {
        this.hodList = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load HODs';
        this.loading = false;
      }
    });
  }

  // ✅ FIXED Edit navigation
  editHod(id: number) {
    this.router.navigate(['/edit-hod', id]);
  }

  deleteHod(id: number) {
    if (confirm('Are you sure you want to delete this HOD?')) {
      this.hodService.delete(id).subscribe({
        next: () => {
          alert('HOD deleted successfully');
          this.loadHods();
        },
        error: () => {
          alert('Failed to delete HOD');
        }
      });
    }
  }
}