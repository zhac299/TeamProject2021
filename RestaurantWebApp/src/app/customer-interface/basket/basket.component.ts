import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/order.service';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
import { Menu } from 'src/models/Menu';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  menuList: Menu[];
  customer: Observable<Customer>;
  
  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.menuList = data.selectedMeals;
      this.customer = data.customer;
    }

  ngOnInit(): void {}

  clear(menuItem: Menu): void {
    const index = this.menuList.indexOf(menuItem, 0);
    if (index > -1) {
      this.menuList.splice(index, 1);
    }
  }

  add(menuItem: Menu): void {
    const index = this.menuList.indexOf(menuItem, 0);
    this.menuList[index].selections++;
  }

  remove(menuItem: Menu): void {
    const index = this.menuList.indexOf(menuItem, 0);
    if(this.menuList[index].selections > 1){
      this.menuList[index].selections--;
    } else {
      this.menuList.splice(index, 1);
    }
  }

  priceTotal(menuList: Menu[]): number {
    let total: number = 0;
    for(let i = 0; i < this.menuList.length; i++) {
      total += this.menuList[i].price * this.menuList[i].selections
    }
    return total;
  }

  placeOrder(): void {
    let orderItemsList: Meal[] = [];
    for(let i = 0; i < this.menuList.length; i++) {
      let meal: Meal= new Meal();
      meal.id = this.menuList[i].id;
      meal.menu = this.menuList[i];
      
      orderItemsList.push(meal);
    }
    this.customer.subscribe((customer) => {
      //console.log(orderItemsList);
      this.orderService.createNewOrderWithCustomerAndMealList(customer,orderItemsList);
    });
  }

  close(): void {
    this.dialogRef.close(this.menuList);
  }
}
