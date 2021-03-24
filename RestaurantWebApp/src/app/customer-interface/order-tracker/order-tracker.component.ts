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

  /**
   * The construstuctor of the class.
   * Injects mat dialog data from the customer interface into the 
   * customer id and table number.
   * 
   * @param dialogRef a dialog ref to handle the mat dialog
   * @param customerService the customer service that handles get and put requests
   * @param orderService the order service that handles get and put requests
   * @param router a router to route to payment
   * @param data the data being injected
   */
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

  /**
   * Set-up method that gets called once when the object is instantiated.
   * Calls displayOrders().
   */
  ngOnInit(): void {
    this.displayOrders();
  }

  /**
   * Displays the customer's orders.
   * Makes a get request to the customer DB by subscribing to getCustomerById()
   * that returns a Customer observable. Inside the subscription, it makes a get request to
   * the orders db by subscribing to getOrders() that returns an Order[] observable. It 
   * subscribes to it and adds to this.orders all the orders corresponding to the customer.
   */
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

  /**
   * Navigates to the payment page for that order by accesing an 
   * activated route with the order id.
   * 
   * @param orderId the order id param used in the activated route
   */
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
