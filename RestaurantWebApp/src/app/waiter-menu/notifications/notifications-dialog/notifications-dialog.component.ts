import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/table.service';
import { Table } from 'src/models/Table';

@Component({
  selector: 'notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.sass']
})
export class NotificationsDialogComponent implements OnInit {

  constructor(
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.tableService.getNeedHelpTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  tables: Table[] = [];

  removeTable(removedTable: Table): void {
    const index = this.tables.indexOf(removedTable);

    if (index >= 0) {
      this.tables.splice(index, 1);
    }
  }

}
