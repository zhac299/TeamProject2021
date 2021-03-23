import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from '../../../models/Meal';
import { Order } from '../../../models/Order';
import { CustomerService } from '../../customer.service';
import { OrderService } from '../../order.service';
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
  orders: Order[] = [];
  tableNumber: number;

  constructor(
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    private customerService: CustomerService,
    private orderService: OrderService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data) {
    this.customerId = data.customerId;
    this.tableNumber = data.tableNumber;
  }

  ngOnInit(): void {
    this.displayOrders();
  }

  displayOrders(): void {
    this.customerService.getCustomerByID(this.customerId).subscribe((customer) => {
      customer.orders.forEach((customerOrder) => {
        this.orderService.getOrders().subscribe((orders) => {
          orders.forEach((order) => {
            if (order.id == customerOrder.id) {
              this.orders.push(order);
            }
          })
        })
      })
    })
  }

  navigateToPayment(orderId: number): void {
    this.router.navigate(['/payment'], 
          { queryParams: { 
            tableNumber: this.tableNumber,
            orderId: orderId, 
            customerId: this.customerId} });
    this.dialogRef.close();
  }

}
