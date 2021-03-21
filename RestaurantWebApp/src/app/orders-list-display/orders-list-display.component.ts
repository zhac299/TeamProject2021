import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {fromEvent, Observable, Subscription, timer} from "rxjs";
import {debounceTime, map, switchMap, tap} from "rxjs/operators";
import {Order} from "../../models/Order";
import {OrderComponent} from "../waiter-menu/order/order.component";
import {MatDialog} from "@angular/material/dialog";
import {Table} from "../../models/Table";
import {PickTableDialogComponent} from "../waiter-menu/pick-table-dialog/pick-table-dialog.component";
import {CustomerService} from "../customer.service";
import { ActivatedRoute } from '@angular/router';
import { Staff } from '../../models/Staff';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-orders-list-display',
  templateUrl: './orders-list-display.component.html',
  styleUrls: ['./orders-list-display.component.sass']
})
export class OrdersListDisplayComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  @Input() createPermission: boolean;
  @Input() isKitchenStaff: boolean;
  @Input() isWaiter: boolean;

  waiter: Staff;
  paramsObject: any;
  staffService: StaffService;

  ORDER_BUTTON_WIDTH = 300;
  orders: Order[];
  subscription: Subscription;
  refreshTimer$ = timer(0, 1000)
    .pipe(tap());
  resize$ = fromEvent(window, 'resize');
  windowWidth: number = Math.floor(window.innerWidth/this.ORDER_BUTTON_WIDTH);

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
      .pipe(debounceTime(250),
      tap(evt=>console.log('window.innerWidth=', window.innerWidth, this.windowWidth)),
        )
      .subscribe((w) => {
        this.windowWidth = Math.floor(window.innerWidth / this.ORDER_BUTTON_WIDTH
        )});

    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.staffService.getStaffById(this.paramsObject.params.staffId).subscribe((staff) => {
        this.waiter = staff;
        console.log(staff);
      })
    });
  }


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

  getDate(orderPlacedTime: string): Date {
    const date = new Date(Date.parse(orderPlacedTime));
    return date;
  }

  // openSelectTableDialog(): Observable<Table> {
  //   const dialogRef = this.dialog.open(PickTableDialogComponent);
  //   return dialogRef.afterClosed();
  // }

  // createNewOrder(): void {
  //   this.openSelectTableDialog()
  //     .pipe(
  //       switchMap((dialogResult) =>
  //         this.customerService.createCustomerWithTable(dialogResult))
  //     ).subscribe((a) =>
  //     this.orderService.createNewOrderWithCustomer(a)
  //   );
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
