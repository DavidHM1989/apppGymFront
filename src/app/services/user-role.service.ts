import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asegúrate de tener el token almacenado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getUsuarios(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers }).pipe(
      map(users =>
        users.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: Array.isArray(user.roles) ? user.roles.join(', ') : 'Sin rol' // Maneja valores nulos
        }))
      )
    );
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener roles:', error);
        return throwError(() => new Error('Error al obtener roles'));
      })
    );
  }

  // 🔹 Agregar usuario
  agregarUsuario(usuario: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/users`, usuario, { headers });
  }
  
  editarUsuario(id: number, usuario: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Verificar si usuario.roles es un array y definir explícitamente el tipo
    const roles = Array.isArray(usuario.roles) 
      ? usuario.roles.map((rol: { id: number; name: string }) => rol.id) 
      : [];
  
    const usuarioActualizado = {
      username: usuario.username,
      email: usuario.email,
      password: usuario.password, // Si el backend permite actualizar la contraseña
      roles: roles
    };
  
    return this.http.put(`${this.apiUrl}/users/${id}`, usuarioActualizado, { headers });
  }
  eliminarUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }

  agregarRol(rol: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/roles`, rol, { headers });
  }

  editarRol(userId: number, newRole: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/roles/${userId}`, { roleName: newRole });
  }

  updateUserRole(id: number, name: string): Observable<any> {
    const url = `${this.apiUrl}/roles/${id}`;
    const body = { name };
    console.log('📌 Datos enviados al backend:', body); // 🔹 Debugging
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.put(url, body, { headers });
  }

  eliminarRol(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/roles/${id}`, { headers });
  }
}