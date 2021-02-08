import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import { OrderService } from "../order.service";
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';  
import { selectedCategory } from 'src/models/selectedCategory';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

    orderList: Order[] = [];
    cat: selectedCategory = new selectedCategory;
    sOrder: Order[] = [];

  constructor(
    private orderService: OrderService,
    ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe( orders => {
        this.orderList = orders;
        
        for (let order of this.orderList) { 
            if (order.category == "Fajita") { 
                this.sOrder.push(order);
                console.log(order);
            }
        }
    
      this.cat = {
          name: "Fajita",
          meal: this.sOrder
        }
    });
      
      
    for(let order of this.orderList) { 
      order.nrSelections = 0;
      console.log(order.nrSelections);
    }
  }

  addItem(order: Order): void {
    order.selected = true;
    order.nrSelections ++;
  }

  removeItem(order: Order): void{
    order.selected = false;
    order.nrSelections --;
  }
}
