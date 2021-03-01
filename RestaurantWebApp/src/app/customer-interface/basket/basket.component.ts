import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MealService } from 'src/app/meal.service';
import { OrderService } from 'src/app/order.service';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Meal[];
  customer: Observable<Customer>;
  
  constructor(
    private mealService: MealService,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mealList = data.selectedMeals;
      this.customer = data.customer;
    }

  ngOnInit(): void {}

  clear(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    if (index > -1) {
      this.mealList.splice(index, 1);
    }
  }

  add(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.mealList[index].selections++;
  }

  remove(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    if(this.mealList[index].selections > 1){
      this.mealList[index].selections--;
    } else {
      this.mealList.splice(index, 1);
    }
  }

  priceTotal(): number {
    let total: number = 0;
    for(let i = 0; i < this.mealList.length; i++) {
      total += this.mealList[i].menu.price * this.mealList[i].selections;
    }
    return total;
  }

  placeOrder(): void {
    this.customer.subscribe((customer) => {
      this.orderService.createNewOrder(customer).subscribe((order) => {
        for(var i = 0 ; i < this.mealList.length; i++) {
          this.mealList[i].order = order;
          this.mealService.createNewMeal(this.mealList[i]).subscribe();
        }
        order.meal = this.mealList;
        console.log(order);
        //this.orderService.updateOrder(order);
      });
    });
  }

  close(): void {
    this.dialogRef.close(this.mealList);
  }
}
