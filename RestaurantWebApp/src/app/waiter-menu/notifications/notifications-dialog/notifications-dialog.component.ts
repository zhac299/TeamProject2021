import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../table.service';
import { Table } from '../../../../models/Table';

/**
 * A dialog component that displays tables that need help in a list
 */
@Component({
  selector: 'notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.sass']
})
export class NotificationsDialogComponent implements OnInit {

  constructor(
    private tableService: TableService
  ) {}

  /**
   * All tables that need help
   */
  tables: Table[] = [];

  /**
   * Gets all tables that need help from service
   */
  ngOnInit(): void {
    this.tableService.refreshNeeded.subscribe(() => {
      this.getNeedHelpTables();
    });
    this.getNeedHelpTables();
  }

  /**
   * Helper function to subscribe to table service
   */
  getNeedHelpTables(): void {
    this.tableService.getNeedHelpTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  /**
   * Marks a clicked on table as helped and removes it from the list of tables
   * that need help
   * @param table
   */
  setTableHelped(table: Table) {
    this.tableService.getTableByNumber(table.tableNumber).subscribe((table) => {
      this.tableService.updateTable(table);
    })
    this.tableService.getNeedHelpTables().subscribe(tables => {
      this.tables = tables;
    })
  }

}
