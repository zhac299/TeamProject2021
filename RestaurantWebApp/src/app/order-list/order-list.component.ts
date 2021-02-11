import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import { OrderListService } from './order-list.service';
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';  
import { selectedCategory } from 'src/models/selectedCategory';
import { MenuFilterDbService } from './menu-filter-db/menu-filter-db.service';
import { Meal } from 'src/models/Meal';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

    mealList: Meal[] = [];
    cat: selectedCategory = new selectedCategory;
    
  constructor(
    private orderService: OrderListService,
    private filterService: MenuFilterDbService
    ) { }

  ngOnInit(): void {
    this.orderService.getMenu().subscribe( orders => {
        this.mealList = orders;
        console.log(this.mealList);
  })
    
  
    




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
  // removeItem(order: Order): void{
  //   order.selected = false;
  //   order.nrSelections --;
  }
}
