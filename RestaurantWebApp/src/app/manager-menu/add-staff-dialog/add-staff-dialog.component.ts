import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Staff } from 'src/models/Staff';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.sass']
})
export class AddStaffDialogComponent implements OnInit {

  selected = -1;
  constructor(public dialogRef: MatDialogRef<AddStaffDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { staff:Staff,title:string }) { }

  ngOnInit(): void {}

  setCalories(value: number) {
    return value;
  }

  onNoClick(): void {
    console.log(this.data.staff);
    this.dialogRef.close();
  }

  setData(staff:Staff) {
    this.data.staff = staff;
  }

}
