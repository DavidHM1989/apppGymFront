import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-dialog',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="dialog-container" [ngClass]="data.type">
        <p class="message">{{ data.message }}</p>
        <mat-icon class="icon">{{ data.type === 'success' ? 'check_circle' : 'error' }}</mat-icon>
    </div>
  `,
  styles: [
    `
    .dialog-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 150px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.success {
  background: #e0f7e9;
  color: #2e7d32;
  border: 0px solid #2e7d32;
}

.error {
  background: #fdecea;
  color: #c62828;
  border: 0px solid #c62828;
  border-radius: 0px;
}

.mat-icon {
  font-size: 50px;
  margin-top: 20px;
  width: 100%;
height: 100%;
}

.message {
  margin-bottom: auto;
  padding: 0 10px;
  white-space: normal;
}

::ng-deep .mat-dialog-container {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
    `,
  ],
})
export class RegisterDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}