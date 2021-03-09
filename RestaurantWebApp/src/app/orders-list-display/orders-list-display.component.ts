import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {fromEvent, Observable, Subscription, timer} from "rxjs";
import {debounceTime, switchMap, tap} from "rxjs/operators";
import {Order} from "../../models/Order";
import {OrderComponent} from "../waiter-menu/order/order.component";
import {MatDialog} from "@angular/material/dialog";
import {Table} from "../../models/Table";
import {PickTableDialogComponent} from "../waiter-menu/pick-table-dialog/pick-table-dialog.component";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-orders-list-display',
  templateUrl: './orders-list-display.component.html',
  styleUrls: ['./orders-list-display.component.sass']
})
export class OrdersListDisplayComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService,
              private customerService: CustomerService,
              public dialog: MatDialog) { }

  @Input() createPermission: boolean;
  @Input() isKitchenStaff: boolean;

  ORDER_BUTTON_WIDTH = 300;
  orders: Order[];
  subscription: Subscription;
  refreshTimer$ = timer(0, 5000)
    .pipe(tap(() => console.log('Fetching Orders...')));
  resize$ = fromEvent(window, 'resize');
  windowWidth: number = Math.floor(window.innerWidth/this.ORDER_BUTTON_WIDTH);

  ngOnInit(): void {
    this.subscription = this.refreshTimer$.subscribe(this.orderService.refresh$);
    if (this.isKitchenStaff) {
      this.orderService.getConfirmedOrders()
        .subscribe((orders) =>this.orders = orders);
    } else {
      this.orderService.orders$.subscribe((orders) => {
        this.orders = orders;
      });
    }
    this.resize$
      .pipe(debounceTime(250),
      tap(evt=>console.log('window.innerWidth=', window.innerWidth, this.windowWidth)),
        )
      .subscribe((w) => {
        this.windowWidth = Math.floor(window.innerWidth / this.ORDER_BUTTON_WIDTH
        )});
  }


  openOrderDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      data: order,
      width: '99%',
      height: '99%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.getUpdatedOrders();
        // this.orderService.updateOrder(result);
      }
    });
  }

  getDate(orderPlacedTime: string): Date {
    const date = new Date(Date.parse(orderPlacedTime));
    return date;
  }

  openSelectTableDialog(): Observable<Table> {
    const dialogRef = this.dialog.open(PickTableDialogComponent);
    return dialogRef.afterClosed();
  }

  createNewOrder(): void {
    this.openSelectTableDialog()
      .pipe(
        switchMap((dialogResult) =>
          this.customerService.createCustomerWithTable(dialogResult))
      ).subscribe((a) =>
      this.orderService.createNewOrderWithCustomer(a)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
