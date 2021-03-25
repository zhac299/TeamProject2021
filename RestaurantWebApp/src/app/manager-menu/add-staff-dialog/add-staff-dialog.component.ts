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

  /**
   * The constructor of the class.
   * Injects the mat dialog data into staff and title.
   * 
   * @param dialogRef the dialog ref
   * @param tableService the table service that is used to make requests
   * @param staffService the staff service that is used to make requests
   * @param data the mat dialog data that is injected
   */
  constructor(public dialogRef: MatDialogRef<AddStaffDialogComponent>,
              public tableService: TableService,
              public staffService: StaffService,
              @Inject(MAT_DIALOG_DATA) public data: { staff:Staff,title:string }) { }

  /**
   * The list of available tables.
   */
  tableList: Table[] = [];

  /**
   * The selected table.
   */
  selectedTable: Table = null;

  /**
   * Asserts if a table was selected.
   */
  selected = -1;

  /**
   * References if the manager accessed add staff dialog or edit staff dialog.
   */
  edit: boolean = this.staffService.edit;

  /**
   * Set-up method, gets called only once when the class is instantiated.
   * Sets up the table list by making a get request to the Table DB.
   */
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