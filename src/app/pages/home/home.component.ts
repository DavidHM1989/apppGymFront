import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn: boolean = false;
  usuario: string | null = null;
  isAdmin: boolean = false;
  menuAbierto: boolean = false; // Nueva variable para mostrar el menú

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.usuario = this.authService.obtenerUsuario();
      this.isLoggedIn = !!this.usuario;

      const role = this.authService.obtenerRol(); // Obtiene el rol
      this.isAdmin = role === 'ADMIN'; // Verifica si es ADMIN
    }
  }

  cerrarSesion() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.usuario = null;
    this.isAdmin = false;
  }
}