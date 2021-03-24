import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Table} from "../../../models/Table";
import {TableService} from "../../table.service";

/**
 * Dialog component for staff picking a table
 */
@Component({
  selector: 'app-pick-table-dialog',
  templateUrl: './pick-table-dialog.component.html',
  styleUrls: ['./pick-table-dialog.component.sass']
})
export class PickTableDialogComponent implements OnInit {

  /**
   * A list of all tables
   */
  tables: Table[];

  /**
   * The selected table
   */
  selectedTable: Table;

  constructor(public dialogRef: MatDialogRef<PickTableDialogComponent>,
              private tableService: TableService) {
  }

  /**
   * Gets all unoccupied tables for user to pick from
   */
  ngOnInit(): void {
    this.tableService.getUnoccupiedTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  /**
   * Closes dialog and returns selected table to parent component
   */
  onSelect(): void {
    this.dialogRef.close(this.selectedTable);
  }

}
