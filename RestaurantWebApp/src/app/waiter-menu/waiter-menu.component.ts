import { Component, OnInit } from '@angular/core';
import {TableService} from '../table.service';
import {Table} from '../../models/Table';
import {MatDialog} from '@angular/material/dialog';
import {OrderComponent} from './order/order.component';

@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.sass']
})
export class WaiterMenuComponent implements OnInit {

  constructor(
    private tableService: TableService,
    public dialog: MatDialog
  ) { }

  tableList: Table[] = [];
  freeTables = 0;
  dialogTable: Table = new Table();

  ngOnInit(): void {
    this.tableService.getTables().subscribe( orders => {
      // checks which incoming tables have orders
      for (const table of orders){
        // updates counter
        if (table.hasOrder){this.freeTables++; }
      }
      this.tableList = orders;
    });
  }

  openOrderDialog(table: Table): void {
    // this.dialogTable = table;
    const dialogRef = this.dialog.open(OrderComponent, {
      data: table,
      width: '99%',
      height: '99%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

