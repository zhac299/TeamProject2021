import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
import { CustomerInterfaceComponent } from '../customer-interface.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
  orderStatus: String = "You haven't placed an order yet!";

  constructor(
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.customerObservable = data.customer;
    }

  async ngOnInit(): Promise<void> {
    this.customer = await this.customerObservable.pipe(take(1)).toPromise();
    this.displayStatus();
    if (this.customer.orders.length == 0) {
      this.orderPlaced = false;
    } else {
      this.orderPlaced = true;
      for (let order of this.customer.orders) {
        this.mealList = order.meal;
      }
    }
  }

  displayStatus(): void {
    for (let order of this.customer.orders) {
      if (order.isDelivered == true) {
        this.orderStatus = "Order was delivered... Buen apetito!";
        if (order.isPaid == true) {
          this.orderStatus = this.orderStatus + " And order was paid... Muchas Gracias!";
        }
      } else if (order.isConfirmed == true) {
        this.orderStatus = "Order was confirmed by a waiter... Paciencia por favor!";
        if (order.isPaid == true) {
          this.orderStatus = this.orderStatus + " And order was paid... Muchas Gracias!";
        }
      } else {
        this.orderStatus = "Order has not been confirmed yet... Paciencia por favor!";
      }
    }
    console.log(this.orderStatus);
  }

  close(): void {
    this.dialogRef.close(this.orderPlaced);
  }

}
