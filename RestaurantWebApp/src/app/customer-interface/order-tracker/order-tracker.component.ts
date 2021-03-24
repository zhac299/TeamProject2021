import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from '../../../models/Order';
import { CustomerService } from '../../customer.service';
import { OrderService } from '../../order.service';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.sass']
})

/**
 * The class that handles the order tracker.
 */
export class OrderTrackerComponent implements OnInit {

  /**
   * The customer id that is used to make get requets.
   */
  customerId: number;

  /**
   * The table number that is used to make get requests.
   */
  tableNumber: number;
  
  /**
   * The list of customer's orders.
   */
  orders: Order[]; 

  constructor(
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    private customerService: CustomerService,
    private orderService: OrderService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data) {
    this.customerId = data.customerId;
    this.tableNumber = data.tableNumber;
    this.orders = [];
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
      {
        queryParams: {
          tableNumber: this.tableNumber,
          orderId: orderId,
          customerId: this.customerId
        }
      });
    this.dialogRef.close();
  }

}
