import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Staff } from '../../../models/Staff';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.sass']
})

/**
 * The class that handles adding a new staff.
 */
export class AddStaffDialogComponent implements OnInit {


  /**
   * The constructor of the class.
   * It injects the mat dialog data into staff and title.
   * 
   * @param dialogRef a dialog ref
   * @param data the injectd mat dialog data
   */
  constructor(public dialogRef: MatDialogRef<AddStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { staff: Staff, title: string }) { }

  /**
   * A set-up method that gets called once when the class gets instantiated.
   */
  ngOnInit(): void { }

  /**
   * Sets the calories from the slider.
   * 
   * @param value the value of the selected nr of calories
   * @returns the new number of calories
   */
  setCalories(value: number) {
    return value;
  }

  /**
   * Closes the dialog.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Sets the data of the mat dialog.
   * 
   * @param staff the new staff to be added to data
   */
  setData(staff: Staff) {
    this.data.staff = staff;
  }

}
