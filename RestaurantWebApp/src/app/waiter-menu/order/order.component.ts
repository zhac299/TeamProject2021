import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WaiterMenuComponent} from "../waiter-menu.component";
import {OrderService} from "../../order.service";
import {Order} from "../../../models/Order";
import {MenuService} from "../../menu.service";
import {Menu} from "../../../models/Menu";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  table: Table;
  total: number = 0;
  menuList: Menu[] = [];

  private orderedMenuItemsSubject$ = new BehaviorSubject<Menu[]>([]);
  orderedMenuItems$ = this.orderedMenuItemsSubject$.asObservable();

  private orderSubject$ = new BehaviorSubject<Order>(this.order);
  order$ = this.orderSubject$.asObservable();

  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private orderService: OrderService,
    public menuService: MenuService) {}

  ngOnInit(): void {
    this.updateAllOrder();
  }

  getId(): number {
    let id = undefined;
    this.order$.subscribe((o) => id = o.id);
    return id;
  }

  updateOrderedMenuItems() {
    if(this.order.meal.length > 0){
      this.order$.subscribe((order) => {
        this.orderService.getOrderedMenuItems(order)
          .subscribe((menuItems) => {
            this.orderedMenuItemsSubject$.next(menuItems);
          });
      });
    }
  }

  updateAllOrder(): void {
    this.updateOrderedMenuItems();
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
  }

  deleteOrder(): void {
    this.orderService.deleteOrderById(this.order.id);
    this.dialogRef.close();
  }

  addMenuToOrder(menu: Menu, order:Order) {
    // link menuId to meal via its id
    // link it to order id
    order.meal.push({
      id: undefined,
      order: undefined,
      menu_id: menu.id
    });
    // this.updateOrder(order);

    const _orderedMenuItems = this.orderedMenuItemsSubject$.getValue();
    _orderedMenuItems.push(menu);
    this.orderedMenuItemsSubject$.next(
      _orderedMenuItems
    );
  }

  save(order: Order) {
    console.log(this.orderSubject$.getValue());
    // this.orderService.updateOrder(order);
    this.order = this.orderSubject$.getValue();
    this.orderedMenuItemsSubject$.complete();
    this.orderedMenuItemsSubject$.complete();
    this.dialogRef.close(order);
  }
}
