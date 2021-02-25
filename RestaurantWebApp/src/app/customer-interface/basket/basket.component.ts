import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/order.service';
import { Customer } from 'src/models/Customer';
import { Menu } from 'src/models/Menu';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Menu[];
  customer: Observable<Customer>;
  
  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mealList = data.selectedMeals;
      this.customer = data.customer;
    }

  ngOnInit(): void {
    // console.log(this.mealList);
    // console.log(this.customer);
  }

  clear(meal: Menu): void {
    const index = this.mealList.indexOf(meal, 0);
    if (index > -1) {
      this.mealList.splice(index, 1);
    }
  }

  add(meal: Menu): void {
    const index = this.mealList.indexOf(meal, 0);
    this.mealList[index].selections++;
  }

  remove(meal: Menu): void {
    const index = this.mealList.indexOf(meal, 0);
    if(this.mealList[index].selections > 1){
      this.mealList[index].selections--;
    } else {
      this.mealList.splice(index, 1);
    }
  }

  priceTotal(mealList: Menu[]): number {
    let total: number = 0;
    for(let i = 0; i < this.mealList.length; i++) {
      total += this.mealList[i].price * this.mealList[i].selections
    }
    return total;
  }

  placeOrder(): void {
    console.log(1);
    this.customer.subscribe((customer) => {
      console.log(customer);
      this.orderService.createNewOrderWithCustomer(customer);
    });
  }
  
  cancelOrder(): void {

  }
}
