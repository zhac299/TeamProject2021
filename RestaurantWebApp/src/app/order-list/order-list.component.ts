import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';
import { selectedCategory } from 'src/models/selectedCategory';
import { Meal } from 'src/models/Meal';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';
import { MenuService } from '../menu.service';
import { MenuFilterService} from './menu-filter.service';
import { Menu } from 'src/models/Menu';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {
  //
  // menu: Menu[] = [];
  // filtered = false;
  // filterArgs: string;

  constructor(
    private menuService: MenuService,
    private menuFilterService: MenuFilterService
    ) { }

  ngOnInit(): void {
    // this.filter(this.filterArgs);
    // console.log(this.filterArgs);
    // console.log(this.filtered);
    // console.log(this.menu);
      // if (!this.filtered){
      //   this.menuService.refreshNeeded.subscribe(()=> {
      //     this.getAllOrders();
      //   });
      //   this.getAllOrders();
      // } else {
      //   this.filter(this.filterArgs);
        // console.log(this.filterArgs);
        // console.log(this.filtered);
        // console.log(this.menu);
      // }
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
