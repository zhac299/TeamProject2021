import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Staff } from '../../../models/Staff';
import { Table } from '../../../models/Table';
import { TableService } from '../../table.service';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.sass']
})

export class AddStaffDialogComponent implements OnInit {

  selected = -1;

  constructor(public dialogRef: MatDialogRef<AddStaffDialogComponent>,
              public tableService: TableService,
              @Inject(MAT_DIALOG_DATA) public data: { staff:Staff,title:string }) { }

  tableList: Table[] = [];
  selectedTable: Table = null;

  ngOnInit(): void {
    this.tableService.getTables().subscribe(table => {
      this.tableList = table;
    })
  }

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

  setTable(): void {
    if (this.selectedTable != null) {
      this.tableService.assignTable(this.selectedTable);
    } 
    this.dialogRef.close();
  }  
}