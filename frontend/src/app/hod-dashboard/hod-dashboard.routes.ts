import { Routes } from '@angular/router';
import { HodDashboardComponent } from './hod-dashboard.component';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { ViewFacultyComponent } from './view-faculty/view-faculty.component';
import { AddDeviceComponent } from '../shared/device/add-device/add-device.component';
import { ViewDeviceComponent } from '../shared/device/view-device/view-device.component';
import { ViewLogsComponent } from '../shared/logs/view-logs/view-logs.component';
import { AddLogComponent } from '../shared/logs/add-log/add-log.component';
import { QrScanComponent } from '../shared/qr-scan/qr-scan.component'; 

// If you already have guards, you can uncomment these and apply below
// import { AuthGuard } from '../auth/auth.guard';
// import { RoleGuard } from '../auth/role.guard';

export const HOD_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: HodDashboardComponent,
    // canActivate: [AuthGuard, RoleGuard],
    // data: { roles: ['HOD'] },
    children: [
      { path: '', redirectTo: 'view-logs', pathMatch: 'full' },

      {
        path: 'add-faculty',
        component: AddFacultyComponent,
        title: 'HOD • Add Faculty',
        data: { label: 'Add Faculty', icon: 'user-plus', breadcrumb: ['HOD', 'Faculty', 'Add'] }
      },
      {
        path: 'view-faculty',
        component: ViewFacultyComponent,
        title: 'HOD • View Faculty',
        data: { label: 'View Faculty', icon: 'users', breadcrumb: ['HOD', 'Faculty', 'View'] }
      },

      {
        path: 'add-device',
        component: AddDeviceComponent,
        title: 'HOD • Add Device',
        data: { label: 'Add Device', icon: 'cpu', breadcrumb: ['HOD', 'Devices', 'Add'] }
      },
      {
        path: 'view-device',
        component: ViewDeviceComponent,
        title: 'HOD • View Devices',
        data: { label: 'View Devices', icon: 'server', breadcrumb: ['HOD', 'Devices', 'View'] }
      },

      {
        path: 'add-log',
        component: AddLogComponent,
        title: 'HOD • Add Log',
        data: { label: 'Add Log', icon: 'file-plus', breadcrumb: ['HOD', 'Logs', 'Add'] }
      },
      {
        path: 'view-logs',
        component: ViewLogsComponent,
        title: 'HOD • View Logs',
        data: { label: 'View Logs', icon: 'files', breadcrumb: ['HOD', 'Logs', 'View'] }
      },

      { path: 'scan', component: QrScanComponent, title: 'HOD • Scan QR', data: { label: 'Scan QR', icon: 'scan' } },

      // catch-all within HOD dashboard
      { path: '**', redirectTo: 'view-logs' }
    ],
  },
];
