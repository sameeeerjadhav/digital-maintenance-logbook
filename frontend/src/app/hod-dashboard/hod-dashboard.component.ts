import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hod-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.css'],
})
export class HodDashboardComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([`/hod-dashboard/${path}`]);
  }
}
