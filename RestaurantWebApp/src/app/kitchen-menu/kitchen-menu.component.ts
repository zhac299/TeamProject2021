import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {MenuService} from "../menu.service";
import {CustomerService} from "../customer.service";
import {MatDialog} from "@angular/material/dialog";
import {TableService} from "../table.service";
import {Menu} from "../../models/Menu";
import {Table} from "../../models/Table";
import {Order} from "../../models/Order";
import {OrderComponent} from "../waiter-menu/order/order.component";
import {EditDialogComponent} from "../waiter-menu/edit-dialog/edit-dialog.component";
import {Observable, Subscription, timer} from "rxjs";
import {PickTableDialogComponent} from "../waiter-menu/pick-table-dialog/pick-table-dialog.component";
import {switchMap, tap} from "rxjs/operators";
import {AddMenuDialogComponent} from "../waiter-menu/add-menu-dialog/add-menu-dialog.component";

@Component({
  selector: 'app-kitchen-menu',
  templateUrl: './kitchen-menu.component.html',
  styleUrls: ['./kitchen-menu.component.sass']
})
export class KitchenMenuComponent implements OnInit {

  subscription: Subscription;
  showFiller = false;
  tableList: Table[] = [];
  freeTables = 0;
  orders: Order[];
  displayedColumns: string[] = ['name', 'description', 'price'];
  getOrders = true;

  constructor() {}

  ngOnInit(): void {}

}
