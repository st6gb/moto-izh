import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-tram-dialog',
  templateUrl: 'dialog_table_schedule.component.html',
  styleUrls: ['./dialog_table_schedule.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogTramComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogTramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
