import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RoleManagementComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home'}  // Redirige rutas inválidas al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true }),MatIconModule,HttpClientModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }