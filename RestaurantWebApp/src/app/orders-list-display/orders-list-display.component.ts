import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {Observable, Subscription, timer} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
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
  orders: Order[];
  subscription: Subscription;
  refreshTimer$ = timer(0, 5000).pipe(tap(() => console.log('Fetching...')));

  ngOnInit(): void {
    this.subscription = this.refreshTimer$.subscribe(this.orderService.refresh$);
    this.orderService.orders$.subscribe((orders) => {
      this.orders = orders;
    });
    console.log(this.createPermission);
  }

  openOrderDialog(order: Order): void {
    // this.dialogTable = table;
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
