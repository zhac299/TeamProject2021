import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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
  customerObservable: Observable<Customer>;
  customer: Customer;
  orderPlaced: Boolean;

  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.customerObservable = data.customer;
    }

  async ngOnInit(): Promise<void> {
    this.customer = await this.customerObservable.pipe(take(1)).toPromise();

    if (this.customer.orders.length == 0) {
      this.orderPlaced = false;
    } else {
      this.orderPlaced = true;
      for (let order of this.customer.orders) {
        this.mealList = order.meal;
      }
    }
  }

  close(): void {
    this.dialogRef.close(this.orderPlaced);
  }

}
