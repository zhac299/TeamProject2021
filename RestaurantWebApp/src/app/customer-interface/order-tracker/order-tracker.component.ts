import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meal } from '../../../models/Meal';
import { CustomerService } from '../../customer.service';
import { CustomerInterfaceComponent } from '../customer-interface.component';

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

  constructor(
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.customerId = data.customerId;
  }

  ngOnInit(): void {
    this.customerService.refreshNeeded.subscribe(() => {
      this.updateStatus();
    })
    this.updateMealList();
    this.updateStatus();
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

  updateStatus(): void {
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
