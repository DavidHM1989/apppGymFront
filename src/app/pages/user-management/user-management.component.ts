import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule,CommonModule,FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  usuarios: any[] = [];
  roles: any[] = [];
  usuarioActual: any = { username: '', email: '', password: '', rolId: null };
  modalAbierto = false;

  constructor(private userRoleService: UserRoleService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios(): void {
    this.userRoleService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  cargarRoles(): void {
    this.userRoleService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  abrirModal(usuario?: any) {
    this.modalAbierto = true;
    this.usuarioActual = usuario ? { ...usuario } : { username: '', email: '', password: '', rolId: null };
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
  
  guardarUsuario(): void {
    const usuario = {
      username: this.usuarioActual.username,
      email: this.usuarioActual.email,
      password: this.usuarioActual.password,
      roles: [{ id: this.usuarioActual.rolId }]
    };

    if (this.usuarioActual.id) {
      this.userRoleService.editarUsuario(this.usuarioActual.id, usuario).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    } else {
      this.userRoleService.agregarUsuario(usuario).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    }
  }

  editarUsuario(usuario: any) {
    console.log("Usuario antes de editar:", usuario);
    usuario.rolId = usuario.roles[0]?.id;
    this.usuarioActual = {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      password: '', // Opcional: si no se cambia la contraseña
      rolId: this.obtenerRolId(usuario.roles) // Extrae correctamente el ID del rol
    };
  
    console.log("Usuario para edición:", this.usuarioActual);
    this.modalAbierto = true;
  }
  
  obtenerRolId(roles: any): number {
    if (Array.isArray(roles) && roles.length > 0) {
      return roles[0].id; // Si roles es un array de objetos, devuelve el primer ID
    } else if (typeof roles === 'string') {
      const rolEncontrado = this.roles.find(r => r.name === roles);
      return rolEncontrado ? rolEncontrado.id : 0; // Busca el ID basado en el nombre del rol
    }
    return 0;
  }

  editUsuario(usuario: any): void {
    this.abrirModal(usuario);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userRoleService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }
}