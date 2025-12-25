import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  // Default route → Landing Page
  { path: '', component: LandingPageComponent, pathMatch: 'full' },

  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Info pages
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  // Dashboards
  {
    path: 'hod-dashboard',
    loadChildren: () =>
      import('./hod-dashboard/hod-dashboard.routes').then(m => m.HOD_DASHBOARD_ROUTES),
  },
  {
    path: 'faculty-dashboard',
    loadChildren: () =>
      import('./faculty-dashboard/faculty-dashboard.routes').then(m => m.FACULTY_DASHBOARD_ROUTES),
  },
  {
    path: 'student-dashboard',
    loadChildren: () =>
      import('./student-dashboard/student-dashboard.routes').then(m => m.STUDENT_DASHBOARD_ROUTES),
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.routes').then(m => m.ADMIN_DASHBOARD_ROUTES),
  },

  // Wildcard route — handles unknown URLs
  { path: '', redirectTo: '', pathMatch: 'full' }
];