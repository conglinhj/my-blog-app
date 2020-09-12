import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface ConfirmDialogInjectData {
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInjectData,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }
}
