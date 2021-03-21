import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../table.service';
import { Table } from '../../../../models/Table';

@Component({
  selector: 'notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.sass']
})
export class NotificationsDialogComponent implements OnInit {

  constructor(
    private tableService: TableService
  ) {}

  tables: Table[] = [];

  ngOnInit(): void {
    this.tableService.refreshNeeded.subscribe(() => {
      this.getNeedHelpTables();
    });
    this.getNeedHelpTables();  
  }

  getNeedHelpTables(): void {
    this.tableService.getNeedHelpTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  setTableHelped(table: Table) {
    this.tableService.getTableByNumber(table.tableNumber).subscribe((table) => {
      this.tableService.updateTable(table);
    })
    this.tableService.getNeedHelpTables().subscribe(tables => {
      this.tables = tables;
    })
  }

}
