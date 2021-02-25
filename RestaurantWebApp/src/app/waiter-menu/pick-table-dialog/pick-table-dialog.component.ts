import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Table} from "../../../models/Table";
import {TableService} from "../../table.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pick-table-dialog',
  templateUrl: './pick-table-dialog.component.html',
  styleUrls: ['./pick-table-dialog.component.sass']
})
export class PickTableDialogComponent implements OnInit {

  tables: Table[];
  selectedTable: Table;

  constructor(public dialogRef: MatDialogRef<PickTableDialogComponent>,
              private tableService: TableService,) { }

  ngOnInit(): void {
    this.tableService.getUnoccupiedTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  onSelect(): void {
    this.dialogRef.close(this.selectedTable);
  }

}
