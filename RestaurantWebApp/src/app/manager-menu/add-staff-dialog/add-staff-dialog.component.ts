import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Staff } from '../../../models/Staff';
import { Table } from '../../../models/Table';
import { StaffService } from '../../staff.service';
import { TableService } from '../../table.service';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.sass']
})

export class AddStaffDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddStaffDialogComponent>,
              public tableService: TableService,
              public staffService: StaffService,
              @Inject(MAT_DIALOG_DATA) public data: { staff:Staff,title:string }) { }

  tableList: Table[] = [];
  selectedTable: Table = null;
  selected = -1;
  edit: boolean = this.staffService.edit;

  ngOnInit(): void {
    this.tableService.getTables().subscribe(table => {
      this.tableList = table;
    })
  }

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

  onYesClick(): void {
    if (this.edit == true) {
      this.setTable();
    } else {
      this.createNewStaff();
    }
  }

  setTable(): void {
    if (this.selectedTable != null) {
      this.tableService.managerAssignTable(this.selectedTable, this.data.staff.id).subscribe((data) => {});    
    } 
    this.dialogRef.close();
  }  

  createNewStaff(): void {
    this.staffService.createStaff(this.data.staff).subscribe((data) => {});
    this.dialogRef.close();
  }
}