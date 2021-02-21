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

  tables: Table[] = [];

  ngOnInit(): void {
    this.tableService.getRefreshNeeded().subscribe(() => {
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
    this.tableService.updateRestaurantTableNeedsHelp(table, false).subscribe();
    this.tableService.getNeedHelpTables().subscribe(tables => {
      this.tables = tables;
    })
  }

}
