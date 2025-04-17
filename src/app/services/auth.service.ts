import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient) {}

  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string; username: string; roles: string[] }>(
      `${this.apiUrl}/login`,
      userData
    ).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token); // Guarda el token
          localStorage.setItem('usuario', response.username);
          localStorage.setItem('role', response.roles[0]); // Guarda el rol
        }
      })
    );
  }

  obtenerUsuario(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('usuario'); // Recupera el username
    }
    return null;
  }


  obtenerRol(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role'); // Devuelve el rol guardado en localStorage
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  register(user: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login'; // Redirige a login
    }
  }
}