import { Component, OnInit } from '@angular/core';
import {TableService} from '../table.service';
import {Table} from '../../models/Table';
import {MatDialog} from '@angular/material/dialog';
import {OrderComponent} from './order/order.component';
import {OrderService} from "../order.service";
import {Order} from "../../models/Order";
import {TableComponent} from "./table/table.component";

@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.sass']
})
export class WaiterMenuComponent implements OnInit {

  constructor(
    private tableService: TableService,
    private orderService: OrderService,
    public dialog: MatDialog
  ) { }

  showFiller = false;
  tableList: Table[] = [];
  freeTables = 0;
  dialogTable: Table = new Table();
  orders: Order[];

  ngOnInit(): void {
    this.tableService.getTables().subscribe( orders => {
      // checks which incoming tables have orders
      for (const table of orders){
        // updates counter
        if (table.hasOrder){this.freeTables++; }
      }
      this.tableList = orders;
    });
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(orders);
    });
  }

  openTableDialog(table: Table): void {
    // this.dialogTable = table;
    const dialogRef = this.dialog.open(TableComponent, {
      data: this.tableList,
      width: '99%',
      height: '99%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openOrderDialog(order: Order): void {
    // this.dialogTable = table;
    const dialogRef = this.dialog.open(OrderComponent, {
      data: this.orders,
      width: '99%',
      height: '99%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  createNewOrder(): Order {
    const newOrder: Order = new Order();
    this.orderService.createNewOrder()
      .subscribe(result => {
        return result;
      });
    console.log(newOrder);
    return newOrder;
  }
}

