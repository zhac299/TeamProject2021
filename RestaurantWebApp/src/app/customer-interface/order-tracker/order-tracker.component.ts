import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MealService } from 'src/app/meal.service';
import { OrderService } from 'src/app/order.service';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
import { BasketComponent } from '../basket/basket.component';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.sass']
})
export class OrderTrackerComponent implements OnInit {

  mealList: Meal[];
  customer: Customer;
  orderPlaced: Boolean;

  constructor(
    private basketComponent: BasketComponent,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>) {};

  ngOnInit(): void {
    this.customer = this.basketComponent.customer;
    for (let order of this.customer.orders) {
      if (order.isPaid == true) {
        this.mealList = order.meal;
      }
    }
    this.orderPlaced = this.basketComponent.orderPlaced;
  }

  close(): void {
    this.dialogRef.close(this.orderPlaced);
  }

}
