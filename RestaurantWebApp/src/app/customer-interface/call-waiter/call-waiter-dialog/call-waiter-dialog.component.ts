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
  selectedTable: string;

  constructor(
    private tableService: TableService 
  ) { }
  ngOnInit(): void {
    this.tableService.getTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  callWaiter(): void {
    console.log(this.selectedTable); 
  }
}
