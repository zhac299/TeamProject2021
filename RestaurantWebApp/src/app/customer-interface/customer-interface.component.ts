import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../../models/Order';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';  

interface Food {
  viewValue: string;
  mappedOrders: Order[];
  selected: boolean;
}

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass']
})
export class CustomerInterfaceComponent implements OnInit {

  orderList: Order[] = [];
  foods: Food[] = [
    {viewValue: 'Main Course', mappedOrders:[this.orderList[0]], selected: false},
    {viewValue: 'Steak', mappedOrders:[this.orderList[1]], selected: false}
  ];
  
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe( orders => {
      this.orderList = orders;
    });
  }

  findCategory(food): void {
    food.selected = false;
  }

  normalView(food): void {
    for(let f of this.foods) { 
      if (food == f) {
        f.selected = true;
      } else {
        f.selected = false;
      }
    }
  }
}
