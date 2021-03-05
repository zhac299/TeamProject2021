import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WaiterMenuComponent} from "../waiter-menu.component";
import {OrderService} from "../../order.service";
import {Order} from "../../../models/Order";
import {MenuService} from "../../menu.service";
import {Menu} from "../../../models/Menu";
import {BehaviorSubject, pipe} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Meal} from "../../../models/Meal";
import {MealService} from "../../meal.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass'],
  // providers: [OrderService,MenuService]
})
export class OrderComponent implements OnInit {

  total: number;
  table: Table;
  menuList: Menu[] = [];

  private orderedMealItemsSubject$ = new BehaviorSubject<Meal[]>([]);
  orderedMealItems$ = this.orderedMealItemsSubject$.asObservable();

  private orderSubject$ = new BehaviorSubject<Order>(this.order);
  order$ = this.orderSubject$.asObservable();

  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private orderService: OrderService,
    public menuService: MenuService,
    private mealService: MealService) {}

  ngOnInit(): void {
    this.updateAllOrder();
  }

  getId(): number {
    let id = undefined;
    this.order$.subscribe((o) => id = o.id);
    return id;
  }

  updateOrderedMealItems() {
    if(this.order.meal.length > 0){
      this.order$.subscribe((order) => {
        this.orderedMealItemsSubject$.next(order.meal);
        this.total = order.total;
      })
    }
  }

  updateAllOrder(): void {
    this.updateOrderedMealItems();
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
  }

  deleteOrder(): void {
    this.orderService.deleteOrderById(this.order.id);
    this.dialogRef.close();
  }

  addMenuToOrder(menu: Menu, order:Order) {
    const _orderedMealItems = this.orderedMealItemsSubject$.getValue();
    let alreadyOrdered = false;
    _orderedMealItems.forEach((meal) => {
      if (meal.menu.name == menu.name){
        meal.numberSelections += 1;
        this.total += meal.menu.price;
        this.mealService.updateMeal(meal);
        alreadyOrdered = true;
      }
    });
    if(alreadyOrdered == false) {
      const newMeal = new Meal();
      newMeal.numberSelections = 1;
      newMeal.menu = menu;
      newMeal.order = order;
      this.total += newMeal.menu.price;
      this.mealService.createNewMeal(newMeal).subscribe((meal) =>{
        _orderedMealItems.push(meal);
      });
    }
    this.orderedMealItemsSubject$.next(_orderedMealItems);
  }

  save(order: Order) {
    console.log(this.orderSubject$.getValue());
    this.order = this.orderSubject$.getValue();
    this.orderedMealItemsSubject$.complete();
    this.orderedMealItemsSubject$.complete();
    this.dialogRef.close(order);
  }

  deleteOrderedMenuItem(meal: Meal) {
    this.mealService.deleteMeal(meal).subscribe((deletedMeal) => console.log(deletedMeal));
  }
}
