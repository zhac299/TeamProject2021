import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WaiterMenuComponent} from "../waiter-menu.component";
import {OrderService} from "../../order.service";
import {Order} from "../../../models/Order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  table: Table;
  orders: Order[] = [];

  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Table,
    private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
