import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-management',
  standalone: true,
  templateUrl: './role-management.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  roles: any[] = [];
  rolActual: any = { id: null, name: '' };
  modalAbierto: boolean = false;

  constructor(private userRoleService: UserRoleService) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.userRoleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }

  abrirModal(rol?: any) {
    this.modalAbierto = true;
    this.rolActual = rol ? { ...rol } : { id: null, name: '' }; // Si se edita, copia el rol
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.rolActual = { id: null, name: '' };
  }

  guardarRol(): void {
    const operacion = this.rolActual.id 
      ? this.userRoleService.updateUserRole(this.rolActual.id, this.rolActual.name) 
      : this.userRoleService.agregarRol({ name: this.rolActual.name });
  
    operacion.subscribe({
      next: () => this.finalizarOperacion(),
      error: (error) => this.manejarError(error)
    });
  }
  
  private finalizarOperacion(): void {
    this.cargarRoles(); // Refresca la lista de roles
    this.cerrarModal(); // Cierra el modal
  }
  
  private manejarError(error: any): void {
    console.error('Error en la operación de rol:', error);
  }

  eliminarRol(id: number): void {
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      this.userRoleService.eliminarRol(id).subscribe({
        next: () => this.cargarRoles(),
        error: (error) => console.error('Error al eliminar el rol:', error)
      });
    }
  }

  getRoles() {
    this.userRoleService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener roles:', error);
      }
    );
  }
  
  editarRol(id: number, nuevoNombre: string) {
    this.userRoleService.updateUserRole(id, nuevoNombre).subscribe(
      (res) => {
        console.log('Rol actualizado:', res);
        this.getRoles(); // Actualiza la lista de roles después de editar
      },
      (err) => {
        console.error('Error al actualizar el rol:', err);
      }
    );
  }
}