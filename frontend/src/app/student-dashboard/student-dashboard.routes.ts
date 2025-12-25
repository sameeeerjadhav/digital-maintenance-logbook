import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard.component';

// Reuse shared components
import { AddLogComponent } from '../shared/logs/add-log/add-log.component';
import { ViewLogsComponent } from '../shared/logs/view-logs/view-logs.component';

export const STUDENT_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: StudentDashboardComponent, // parent layout with sidebar
    children: [
      { path: '', redirectTo: 'view-logs', pathMatch: 'full' },
      { path: 'add-log', component: AddLogComponent },
      { path: 'view-logs', component: ViewLogsComponent }, // later: filter by current student
    ],
  },
];
