import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // ✅ Global HTTP Interceptor for JWT
    provideHttpClient(
      withInterceptors([
        (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
          const isAuth =
            req.url.includes('/auth/login') ||
            req.url.includes('/auth/signup');

          const auth = inject(AuthService);
          const token = auth.getToken();

          if (token && !isAuth) {
            req = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` } // ✅ fixed string
            });
          }

          // ✅ Must return the Observable
          return next(req);
        }
      ])
    ),

    // ✅ Import Forms support
    importProvidersFrom(FormsModule, ReactiveFormsModule)
  ]
}).catch(err => console.error(err));