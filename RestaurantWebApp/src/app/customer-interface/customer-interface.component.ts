import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../../models/Order';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";

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
    {viewValue: 'Fajitas', mappedOrders:[this.orderList[0]], selected: false},
    {viewValue: 'Nachos', mappedOrders:[this.orderList[1]], selected: false},
    {viewValue: 'Dips', mappedOrders:[this.orderList[1]], selected: false},
    {viewValue: 'Deserts', mappedOrders:[this.orderList[1]], selected: false}
  ];
  menuList: Menu[];

  constructor(private orderService: OrderService,
              private menuService: MenuService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe( orders => {
      this.orderList = orders;
    });
    this.menuService.getMenu().subscribe(menuItems => this.menuList = menuItems);
  }

  findCategory(food): void {
    for(let f of this.foods) {
      if (food == f) {
        f.selected = true;
      } else {
        f.selected = false;
      }
    }
  }

}
