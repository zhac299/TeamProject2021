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

  total: number;
  table: Table;
  menuList: Menu[] = [];

  private orderedMealItemsSubject$ = new BehaviorSubject<Meal[]>([]);
  orderedMealItems$ = this.orderedMealItemsSubject$.asObservable();

  private orderSubject$ = new BehaviorSubject<Order>(this.data.order);
  order$ = this.orderSubject$.asObservable();
  subscription: Subscription;
  subscriptionMenus: Subscription;
  refreshTimer$ = timer(0, 1000);

  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {order: Order, isKitchenStaff: boolean},
    private orderService: OrderService,
    public menuService: MenuService,
    private mealService: MealService) {}

  ngOnInit(): void {
    this.updateOrderedMealItems();
    this.subscriptionMenus = this.refreshTimer$.subscribe(this.menuService.refresh$);
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
    this.subscription = this.refreshTimer$.subscribe(this.orderService.refresh$);
    this.orderService.getOrderById(this.data.order.id).subscribe((orders) => {
      this.orderSubject$.next(orders);
      this.data.order = orders;
    });
    if(this.data.isKitchenStaff == undefined) {
      this.data.isKitchenStaff = false;
    }
  }

  updateOrderReady(order: Order): void{
    this.orderService.updateOrderReady(order).subscribe((order) => {
      this.orderSubject$.next(order);
    })
  }

  updateOrderDelivered(order: Order): void {
    this.orderService.updateOrderDelivered(order).subscribe((order) => {
      this.orderSubject$.next(order);
    })
  }

  updateOrderConfirmed(order: Order): void {
    this.orderService.updateOrderConfirmed(order)
      .subscribe((newOrder) =>this.orderSubject$.next(newOrder));
    console.log(order);
  }

  updateOrderIsPaid(order: Order): void {
    this.orderService.updateIsPaid(order);
  }

  getId(): number {
    let id = undefined;
    this.order$.subscribe((o) => id = o.id);
    return id;
  }

  updateOrderedMealItems() {
    if(this.data.order.meal.length > 0){
      this.order$.subscribe((order) => {
        this.orderedMealItemsSubject$.next(order.meal);
        this.total = order.total;
      })
    }
  }

  deleteOrder(): void {
    console.log(this.data.order.id);
    this.orderService.deleteOrderById(this.data.order.id);
    this.dialogRef.close();
  }

  addMenuToOrder(menu: Menu, order:Order) {
    const _orderedMealItems = this.orderedMealItemsSubject$.getValue();
    let alreadyOrdered = false;
    _orderedMealItems.forEach((meal) => {
      if (meal.menu.name == menu.name){
        meal.numberSelections += 1;
        order.total += meal.menu.price
        this.total = order.total;
        this.orderService.updateTotal(order);
        this.mealService.updateNumberSelections(meal);
        alreadyOrdered = true;
      }
    });
    if(alreadyOrdered == false) {
      const newMeal = new Meal();
      newMeal.numberSelections = 1;
      newMeal.menu = menu;
      newMeal.order = order;
      order.total += menu.price
      this.total = order.total;
      this.orderService.updateTotal(order);
      this.mealService.createNewMeal(newMeal).subscribe((meal) =>{
        _orderedMealItems.push(meal);
      });
    }
    this.orderedMealItemsSubject$.next(_orderedMealItems);
  }

  save(order: Order) {
    console.log(this.orderSubject$.getValue());
    this.data.order = this.orderSubject$.getValue();
    this.orderedMealItemsSubject$.complete();
    this.orderedMealItemsSubject$.complete();
    this.dialogRef.close(order);
  }

  deleteOrderedMenuItem(meal: Meal) {
    this.mealService.deleteMeal(meal).subscribe((deletedMeal) => console.log(deletedMeal));
    this.data.order.total -= meal.menu.price * meal.numberSelections;
    this.total = this.data.order.total;
    this.orderService.updateTotal(this.data.order);
  }
}
