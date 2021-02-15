import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WaiterMenuComponent} from '../waiter-menu.component';
import {OrderService} from '../../order.service';
import {Order} from '../../../models/Order';
import {MenuService} from '../../menu.service';
import {Menu} from '../../../models/Menu';
import {MealService} from '../../meal.service';
import {pipe} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  table: Table;
  total = 0;
  orderedMeals: Menu[] = [];
  // menu: Menu;
  menuList: Menu[] = [];

  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private orderService: OrderService,
    public menuService: MenuService,
    public mealService: MealService) {}

  ngOnInit(): void {
    // this.orderService.getOrders().subscribe(orders => this.orders = orders);
    // this.menuService.getMenuById(this.data.id).subscribe(menu => this.menu = menu);

    this.menuService.getMenu().subscribe(menuItems => this.menuList = menuItems);
    this.findMealFromMenu();
  }

  // Gets all meals from the menu and initialises menuList with those meals
  findMealFromMenu(): void {
    if (this.data.meal.length > 0 || this.data.meal !== undefined) {
      this.data.meal.forEach(value => {
        this.menuService.getMenuById(value.menu_id).subscribe(meal => {
          this.orderedMeals.push(meal);
          // update price total
          this.total += meal.price;
        });
      });
    }
  }

  deleteOrder(): void {
    this.orderService.deleteOrderById(this.data.id).subscribe(

    );
    this.dialogRef.close();
  }

  updateOrder(order: Order): void {
    this.orderService.updateOrder(order).subscribe();
  }

  addMealToOrder(menu: Menu, data: Order): void {
    this.mealService.createNewMeal({
      id: null,
      menu_id: menu.id,
      order: data
    }).subscribe(pipe(() => this.findMealFromMenu()));
  }
}
