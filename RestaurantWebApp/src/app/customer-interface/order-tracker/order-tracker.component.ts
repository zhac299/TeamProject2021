import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
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
  orderStatus: String;

  constructor(
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

  displayStatus(): void {
    for (let order of this.customer.orders) {
      if (order.isConfirmed == true) {
        this.orderStatus = "Order was confimred by a waiter... Paciencia por favor!";
      } else if (order.isDelivered == true) {
        this.orderStatus = "Order was delivered... Buen apetito!";
      } else if (order.isPaid == true) {
        this.orderStatus = "Order was paid... Muchas Gracias!";
      }
    }
  }

  close(): void {
    this.dialogRef.close(this.orderPlaced);
  }

}
