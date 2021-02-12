import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';  
import { selectedCategory } from 'src/models/selectedCategory';
import { Meal } from 'src/models/Meal';
import { Observable } from 'rxjs';
import { OrderListService} from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

  mealList: Meal[] = [];
    
  constructor(
    private orderListService: OrderListService
    ) { }

  ngOnInit(): void {
      this.orderListService.setUp().subscribe( orders => {
        this.mealList = orders;
      });
    }

  filter(filterArgs: string): void {
      this.orderListService.filter(filterArgs).subscribe( orders => {
        //console.log(orders);
        this.mealList = orders;
      });
    }
}
  
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
