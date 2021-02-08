import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import { OrderService } from '../order.service';
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

  orderList: Order[] = [];

  constructor(
    private orderService: OrderService,
    ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe( orders => {
      this.orderList = orders;
    });
    // NEEDS TO BE REFACTORED
  //
  //   for(let order of this.orderList) {
  //     order.nrSelections = 0;
  //     console.log(order.nrSelections);
  //   }
  // }
  //
  // addItem(order: Order): void {
  //   order.selected = true;
  //   order.nrSelections ++;
  // }
  //
  // removeItem(order: Order): void{
  //   order.selected = false;
  //   order.nrSelections --;
  }
}
