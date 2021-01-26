import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import {OrderService} from "../order.service";
import {OrderComponent} from '../order/order.component';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    ) { }
  orderList: Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrders().subscribe( orders => {
      this.orderList = orders;
    });
  }
}
