import { Component, OnInit } from '@angular/core';

import { TableService } from 'src/app/table.service';
import { Table } from 'src/models/Table';

@Component({
  selector: 'call-waiter-dialog',
  templateUrl: './call-waiter-dialog.component.html',
  styleUrls: ['./call-waiter-dialog.component.sass']
})
export class CallWaiterDialogComponent implements OnInit {

  tables: Table[] = [];
  selectedTable: Table;
  waiterCalled: boolean = false;

  constructor(
    private tableService: TableService
  ) { }
  ngOnInit(): void {
    this.tableService.getUnoccupiedTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  callWaiter(): void {
    this.tableService.updateRestaurantTableNeedsHelp(this.selectedTable, true).subscribe();
    this.tableService.updateRestaurantTableIsOccupied(this.selectedTable, true).subscribe();
    this.waiterCalled = true;
  }

  cancelCallWaiter(): void {
    this.tableService.updateRestaurantTableNeedsHelp(this.selectedTable, false).subscribe();
    this.waiterCalled = false;
  }
}
