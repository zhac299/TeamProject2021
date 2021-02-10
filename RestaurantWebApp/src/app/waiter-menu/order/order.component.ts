import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WaiterMenuComponent} from "../waiter-menu.component";
import {OrderService} from "../../order.service";
import {Order} from "../../../models/Order";
import {DrinkService} from "../../drink.service";
import {Drink} from "../../../models/Drink";
import {MenuService} from "../../menu.service";
import {Menu} from "../../../models/Menu";
import {Meal} from "../../../models/Meal";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  table: Table;
  orderedMeals: Menu[] = [];
  menu: Menu;
  menuList: Menu[] = [];

  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private orderService: OrderService,
    public menuService: MenuService) {}

  ngOnInit(): void {
    // this.orderService.getOrders().subscribe(orders => this.orders = orders);
    this.menuService.getMenuById(this.data.id).subscribe(menu => this.menu = menu);
    this.menuService.getMenu().subscribe(menuItems => this.menuList = menuItems);
    this.findMealFromMenu();
  }

  findMealFromMenu(): void {
    this.data.meal.forEach(value => {
      this.menuService.getMenuById(value.menu_id).subscribe(meal => {
        this.orderedMeals.push(meal);
      });
    });
  }


}
