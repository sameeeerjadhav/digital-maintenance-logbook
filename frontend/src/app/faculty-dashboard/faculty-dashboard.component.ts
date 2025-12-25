import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css'],
})
export class FacultyDashboardComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([`/faculty-dashboard/${path}`]);
  }
}
