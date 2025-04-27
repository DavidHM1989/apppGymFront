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
    this.usuarioActual = usuario ? { ...usuario } : { username: '', email: '', password: '', rolId: null, id: null };
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
  
  guardarUsuario(): void {
    const usuario = {
      username: this.usuarioActual.username,
      email: this.usuarioActual.email,
      password: this.usuarioActual.password,
      roles: [{ id: this.usuarioActual.rolId }]  // Asegúrate de enviar el ID del rol
    };
  
    // Si el id está presente, estamos actualizando el usuario
    if (this.usuarioActual.id) {
      this.userRoleService.editarUsuario(this.usuarioActual.id, usuario).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    } else {
      // Si no hay id, estamos creando un nuevo usuario
      this.userRoleService.agregarUsuario(usuario).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    }
  }

  editarUsuario(usuario: any): void {
    const usuarioParaActualizar = {
      ...usuario,
      roles: [{ id: usuario.rolId }]  // Enviar el ID del rol correctamente
    };
  
    // Llamar al servicio para actualizar el usuario con el formato adecuado
    this.userRoleService.editarUsuario(usuario.id, usuarioParaActualizar).subscribe({
      next: () => {
        console.log('Usuario actualizado exitosamente');
        this.cargarUsuarios();  // Recargar los usuarios después de la actualización
        this.cerrarModal();  // Cerrar el modal
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    });
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