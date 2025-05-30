import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (!token || !this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirige al login si no hay token válido
      return false;
    }

    const userRole = this.authService.obtenerRol(); // Método corregido en AuthService
    if (userRole !== 'ADMIN') {
      this.router.navigate(['/home']); // Si no es ADMIN, redirige al home
      return false;
    }

    return true;
  }
}