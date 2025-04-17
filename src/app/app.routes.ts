import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'usuarios', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RoleManagementComponent, canActivate: [AuthGuard] },
];
