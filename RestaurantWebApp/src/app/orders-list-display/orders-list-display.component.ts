import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {fromEvent, Subscription, timer} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {Order} from "../../models/Order";
import {OrderComponent} from "../waiter-menu/order/order.component";
import {MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../customer.service";
import { ActivatedRoute } from '@angular/router';
import { Staff } from '../../models/Staff';
import { StaffService } from '../staff.service';

/**
 * Reusable component that displays a list of orders depending on the type of staff that views it.
 * The waiters are viewed tables that need confirmation and are prepared. Kitchen staff can only see
 * orders that need to be prepared. Managers see all orders.
 */
@Component({
  selector: 'app-orders-list-display',
  templateUrl: './orders-list-display.component.html',
  styleUrls: ['./orders-list-display.component.sass']
})
export class OrdersListDisplayComponent implements OnInit, OnDestroy {

  /**
   *
   * @param orderService to perform crud operations for Orders
   * @param customerService to perform crud for customers
   * @param route Activated route that routes to this page with staff parameters
   * @param dialog To open/close dialogs
   */
  constructor(private orderService: OrderService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  /**
   * If staff have permission to create orders
   */
  @Input() createPermission: boolean;
  /**
   * If staff are kitchen staff
   */
  @Input() isKitchenStaff: boolean;

  /**
   * If staff are waiter staff
   */
  @Input() isWaiter: boolean;

  /**
   * Field to hold staff object
   */
  waiter: Staff;

  /**
   * Helper object to hold route parameters by logged in staff
   */
  paramsObject: any;

  /**
   * Staff service
   */
  staffService: StaffService;

  /**
   * Field to store orders
   */
  orders: Order[];

  /**
   * A subscription that uses the timer to get new data from the API
   */
  subscription: Subscription;

  /**
   * A refresh timer that ticks every second
   */
  refreshTimer$ = timer(0, 1000);

  /**
   * An event listener that emits a new value every
   * time the window changes
   */
  resize$ = fromEvent(window, 'resize');

  /**
   * Width static variable of the order button
   */
  ORDER_BUTTON_WIDTH = 300;

  /**
   * Number of columns that the width should take up for each row
   */
  columns: number = Math.floor(window.innerWidth/this.ORDER_BUTTON_WIDTH);

  /**
   * Gets orders and filters them based on type of staff. Resizes rows of buttons
   * depending on size of screen.
   */
  ngOnInit(): void {
    this.subscription = this.refreshTimer$.subscribe(this.orderService.refresh$);
    if (this.isKitchenStaff) {
      this.orderService.orders$.pipe(
        map((orders) => orders.filter((order) => order.isConfirmed)),
        map((orders) => orders.filter((order) => !order.isReady))
      )
        .subscribe((orders) =>this.orders = orders);
    } else if(this.isWaiter) {
        this.orderService.orders$.pipe(
          map((orders) => orders.filter((order) => order.waiterId == this.orderService.waiterId)),
        ).subscribe((orders) =>this.orders = orders);
    } else {
      this.orderService.orders$.subscribe((orders) =>this.orders = orders);
    }
    this.resize$
      .pipe(debounceTime(250))
      .subscribe((w) => {
        this.columns = Math.floor(window.innerWidth / this.ORDER_BUTTON_WIDTH
        )});

    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.staffService.getStaffById(this.paramsObject.params.staffId).subscribe((staff) => {
        this.waiter = staff;
      })
    });
  }

  /**
   * Opens the order dialog to edit the order
   * @param order to open configurations of and change
   */
  openOrderDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      data: {order: order, isKitchenStaff: this.isKitchenStaff},
      width: '90%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.getUpdatedOrders();
      }
    });
  }

  /**
   * Gets parsed date from order time
   * @param orderPlacedTime
   */
  getDate(orderPlacedTime: string): Date {
    const date = new Date(Date.parse(orderPlacedTime));
    return date;
  }

  /**
   * Unsubscribes to get request timer
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
