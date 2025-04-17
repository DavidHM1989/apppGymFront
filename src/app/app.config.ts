import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,Routes } from '@angular/router';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { routes as appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección opcional
  { path: 'home', component: HomeComponent }, // 👈 Ruta definida correctamente
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'usuarios', component: UserManagementComponent, canActivate: [AuthGuard]},
  {path: 'roles', component: RoleManagementComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' } // 👈 Captura rutas no existentes
];

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Use the local 'routes' constant directly
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
};