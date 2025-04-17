import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    MatCardModule,
    MatInputModule,
    RouterModule,
    MatDialogModule // Importamos MatDialogModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
user = { username: '', email: '', password: '' };
errorMessage = '';
modalVisible= false;
modalType= '';
modalMessage= '';
usuario: string | null = null;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  register() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.showModal('Todos los campos son obligatorios', 'error');
      return;
    }
  
    this.http.post('http://localhost:8080/api/auth/register', this.user).subscribe({
      next: () => {
        this.showModal('Registro exitoso', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Redirige al login después de 3 segundos
      },
      error: err => {
        this.showModal(err.error.message || 'Error en el registro', 'error');
      }
    });
  }

  showModal(message: string, type: string) {
    this.modalMessage = message;
    this.modalType = type;
    this.modalVisible = true;
    setTimeout(() => {
      this.modalVisible = false;
    }, 2000);
  }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
  }
}