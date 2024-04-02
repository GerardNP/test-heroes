import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-information',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './dialog-information.component.html',
  styleUrl: './dialog-information.component.scss'
})
export class DialogInformationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  sendResponse(): void {
    this.dialogRef.close(true);
  }
}
