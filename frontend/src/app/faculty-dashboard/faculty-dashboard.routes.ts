import { Routes } from '@angular/router';
import { FacultyDashboardComponent } from './faculty-dashboard.component';

// Shared components
import { AddDeviceComponent } from '../shared/device/add-device/add-device.component';
import { ViewDeviceComponent } from '../shared/device/view-device/view-device.component';
import { ViewLogsComponent } from '../shared/logs/view-logs/view-logs.component';
import { AddLogComponent } from '../shared/logs/add-log/add-log.component';
import { QrScanComponent } from '../shared/qr-scan/qr-scan.component'; // ✅ updated path

export const FACULTY_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: FacultyDashboardComponent, // ✅ parent layout (sidebar + outlet)
    children: [
      { path: '', redirectTo: 'view-logs', pathMatch: 'full' }, // default
      { path: 'add-log', component: AddLogComponent },
      { path: 'view-logs', component: ViewLogsComponent },
      { path: 'add-device', component: AddDeviceComponent },
      { path: 'view-device', component: ViewDeviceComponent },
      { path: 'qr-scan', component: QrScanComponent }, // ✅ now uses shared component
    ],
  },
];
