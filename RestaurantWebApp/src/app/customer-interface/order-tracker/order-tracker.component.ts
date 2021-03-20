import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription, timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
import { CustomerInterfaceComponent } from '../customer-interface.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.sass']
})
export class OrderTrackerComponent implements OnInit {

  mealList: Meal[];
  customerId: number;
  orderPlaced: Boolean;
  orderStatus: String;
  subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.customerId = data.customerId;
  }

  ngOnInit(): void {
    this.updateMealList();
    this.displayStatus();
  }

  updateMealList(): void {
    this.customerService.getCustomerByID(this.customerId).subscribe((customer) => {
      if (customer.orders.length == 0) {
        this.orderPlaced = false;
      } else {
        this.orderPlaced = true;
        this.mealList = customer.orders[0].meal;
      }
    })
  }

  displayStatus(): void {
    this.customerService.getCustomerByID(this.customerId).subscribe((customer) => {
      let order = customer.orders[0];
      if (order == undefined) {
        this.orderStatus = "You haven't placed an order yet!"
      } else if (order.isDelivered == true) {
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
    })
  }

  close(): void {
    this.dialogRef.close(this.orderPlaced);
  }

}
