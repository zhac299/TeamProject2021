import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WaiterMenuComponent} from "../waiter-menu.component";
import {OrderService} from "../../order.service";
import {Order} from "../../../models/Order";
import {MenuService} from "../../menu.service";
import {Menu} from "../../../models/Menu";
import {Meal} from "../../../models/Meal";
import {Observable, pipe} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  table: Table;
  total: number = 0;
  orderedMeals: Menu[] = [];
  // menu: Menu;
  menuList: Menu[] = [];

  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private orderService: OrderService,
    public menuService: MenuService) {}

  ngOnInit(): void {
    // this.orderService.getOrders().subscribe(orders => this.orders = orders);
    // this.menuService.getMenuById(this.data.id).subscribe(menu => this.menu = menu);

    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe(menuItems => this.menuList = menuItems);
      this.menuService.findMealFromMenu(this.order)
        .subscribe((menus) => {
          menus.forEach((menu) => {
            this.total += menu.price;
          });
          this.orderedMeals = menus;
          this.menuList = menus;
        });
    //   .subscribe(meal => {
    //   this.orderedMeals.push(meal);
    //   //update price total
    //   this.total += meal.price;
    // });
  }

  // Gets all meals from the menu and initialises menuList with those meals


  deleteOrder(): void {
    this.orderService.deleteOrderById(this.order.id);
    this.dialogRef.close();
  }

  updateOrder(order: Order): void {
    this.orderService.updateOrder(order);
  }

  addMenuToOrder(menu: Menu, order:Order) {
    // link menuId to meal via its id
    // link it to order id
    order.meal.push({
      id: undefined,
      order: undefined,
      menu_id: menu.id
    });
    this.orderService.updateOrder(order)
  }
}
