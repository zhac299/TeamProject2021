import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../../models/Order';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';  

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass']
})
export class CustomerInterfaceComponent implements OnInit {

  orderList: Order[] = [];
  selectedValue: string;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe( orders => {
      this.orderList = orders;
    });
  }

}
