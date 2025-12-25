import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

// Shared components
import { AddDeviceComponent } from '../shared/device/add-device/add-device.component';
import { ViewDeviceComponent } from '../shared/device/view-device/view-device.component';
import { AddLogComponent } from '../shared/logs/add-log/add-log.component';
import { ViewLogsComponent } from '../shared/logs/view-logs/view-logs.component';
import { QrScanComponent } from '../shared/qr-scan/qr-scan.component';

// Admin-only
import { AddHodComponent } from './add-hod/add-hod.component';
import { ViewHodsComponent } from './view-hods/view-hods.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewStudentsComponent } from './view-students/view-students.component';

export const ADMIN_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      // ✅ Default redirect (only one)
      { path: '', redirectTo: 'view-hods', pathMatch: 'full' },

      // ✅ HOD management
      { path: 'add-hod', component: AddHodComponent, title: 'Admin • Add HOD' },
      { path: 'view-hods', component: ViewHodsComponent, title: 'Admin • View HODs' },
      { path: 'edit-hod/:id', component: AddHodComponent, title: 'Admin • Edit HOD' },

      // ✅ Student management
      { path: 'add-student', component: AddStudentComponent, title: 'Admin • Add Student' },
      { path: 'view-students', component: ViewStudentsComponent, title: 'Admin • View Students' },

      // ✅ Device management
      { path: 'add-device', component: AddDeviceComponent, title: 'Admin • Add Device' },
      { path: 'view-device', component: ViewDeviceComponent, title: 'Admin • View Devices' },

      // ✅ Logs
      { path: 'add-log', component: AddLogComponent, title: 'Admin • Add Log' },
      { path: 'view-logs', component: ViewLogsComponent, title: 'Admin • View Logs' },

      // ✅ QR Scan
      { path: 'qr-scan', component: QrScanComponent, title: 'Admin • Scan QR' },
    ],
  },
];