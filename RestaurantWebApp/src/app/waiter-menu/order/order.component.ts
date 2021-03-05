import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WaiterMenuComponent} from "../waiter-menu.component";
import {OrderService} from "../../order.service";
import {Order} from "../../../models/Order";
import {MenuService} from "../../menu.service";
import {Menu} from "../../../models/Menu";
import {BehaviorSubject, Subscription, timer} from "rxjs";
import {tap} from "rxjs/operators";
import {Meal} from "../../../models/Meal";
import {MealService} from "../../meal.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass'],
})
export class OrderComponent implements OnInit {

  table: Table;
  total: number = 0;
  menuList: Menu[] = [];

  private orderedMealItemsSubject$ = new BehaviorSubject<Meal[]>([]);
  orderedMealItems$ = this.orderedMealItemsSubject$.asObservable();

  private orderSubject$ = new BehaviorSubject<Order>(this.order);
  order$ = this.orderSubject$.asObservable();
  subscription: Subscription;
  refreshTimer$ = timer(0, 5000)
    .pipe(tap(() => console.log('Fetching...')));


  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private orderService: OrderService,
    public menuService: MenuService,
    private mealService: MealService) {}

  ngOnInit(): void {
    this.updateAllOrder();
    this.subscription = this.refreshTimer$.subscribe(this.orderService.refresh$);
    this.orderService.getOrderById(this.order.id).subscribe((orders) => {
      this.orderSubject$.next(orders);
      this.order = orders;
    });
  }

  updateOrderConfirmed(order: Order): void {
    this.orderService.updateOrderConfirmed(order)
      .subscribe((newOrder) =>this.orderSubject$.next(newOrder));
    console.log(order);
  }
  updateOrderDelivered(order: Order): void {
    this.orderService.updateOrderDelivered(order)
      .subscribe((newOrder) =>this.orderSubject$.next(newOrder));
    console.log(order);
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
        order.meal.forEach((meal) => {this.total = this.total + meal.menu.price})
      })
    }
  }

  setTotal(menuItems: Menu[]): void {
    menuItems.forEach((item) => {this.total = this.total + item.price});
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
    const newMeal = new Meal();
    newMeal.selections = 1;
    newMeal.menu = menu;
    newMeal.order = order;
    const _orderedMealItems = this.orderedMealItemsSubject$.getValue();
    this.mealService.createNewMeal(newMeal)
      .subscribe((meal) =>{
        _orderedMealItems.push(meal);
        this.orderedMealItemsSubject$.next(_orderedMealItems);
      });
  }

  save(order: Order) {
    console.log(this.orderSubject$.getValue());
    // this.orderService.updateOrder(order);
    this.order = this.orderSubject$.getValue();
    this.orderedMealItemsSubject$.complete();
    this.orderedMealItemsSubject$.complete();
    this.dialogRef.close(order);
  }

  deleteOrderedMenuItem(meal: Meal) {
    this.mealService.deleteMeal(meal).subscribe((deletedMeal) => console.log(deletedMeal));
  }
}
