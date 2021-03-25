import {Component, Inject, OnInit} from '@angular/core';
import {Table} from '../../../models/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WaiterMenuComponent} from "../waiter-menu.component";
import {OrderService} from "../../order.service";
import {Order} from "../../../models/Order";
import {MenuService} from "../../menu.service";
import {Menu} from "../../../models/Menu";
import {BehaviorSubject, Subscription, timer} from "rxjs";
import {Meal} from "../../../models/Meal";
import {MealService} from "../../meal.service";

/**
 * Dialog component for Orders. Displays all information and controls for an order.
 * Displays options to edit order if isWaiterStaff property is false.
 */
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass'],
})
export class OrderComponent implements OnInit {

  /**
   * Total sum for the order bill
   */
  total: number;

  /**
   * The current table the order belongs to
   */
  table: Table;

  /**
   * The list of all menu item's that can be added to an order
   */
  menuList: Menu[] = [];

  /**
   * Reactive subject to change the meals that have been ordered in this current order
   * @private
   */
  private orderedMealItemsSubject$ = new BehaviorSubject<Meal[]>([]);

  /**
   * Ordered Meal items as an observable that can be subscribed to
   */
  orderedMealItems$ = this.orderedMealItemsSubject$.asObservable();

  /**
   * The current order as a reactive subject that can be changed and also subscribed to
   * @private
   */
  private orderSubject$ = new BehaviorSubject<Order>(this.data.order);

  /**
   * The order subject as an obsrevable that can be subscribed to
   */
  order$ = this.orderSubject$.asObservable();

  /**
   * A subscription that uses the timer to get new data from the API
   */
  subscription: Subscription;
  subscriptionMenus: Subscription;
  refreshTimer$ = timer(0, 1000);

  /**
   *
   * @param dialogRef for opening/closing dialogs in the component
   * @param data Injected data {Order, isKitchenStaff} from parent component
   * @param orderService To perfrom crud on orders
   * @param menuService To perform crud on menus
   * @param mealService to perform crud on meals
   */
  constructor(
    public dialogRef: MatDialogRef<WaiterMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {order: Order, isKitchenStaff: boolean},
    private orderService: OrderService,
    public menuService: MenuService,
    private mealService: MealService) {}


  /**
   * Subscribes to order service and menu service for real time changes with
   * 1 second polling
    */
  ngOnInit(): void {
    this.updateOrderedMealItems();
    this.subscriptionMenus = this.refreshTimer$.subscribe(this.menuService.refresh$);
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
      console.log(menu);
    });
    // subscription uses 1s timer on the backend get request call
    this.subscription = this.refreshTimer$.subscribe(this.orderService.refresh$);
    this.orderService.getOrderById(this.data.order.id).subscribe((orders) => {
      this.orderSubject$.next(orders);
      this.data.order = orders;
    });
    if(this.data.isKitchenStaff == undefined) {
      this.data.isKitchenStaff = false;
    }
  }

  /**
   * Updates isReady property for order
   * @param order to update status of isReady
   */
  updateOrderReady(order: Order): void{
    this.orderService.updateOrderReady(order).subscribe((order) => {
      this.orderSubject$.next(order);
    })
  }

  /**
   * Updates an order's delivery status
   * @param order to change delivery status of
   */
  updateOrderDelivered(order: Order): void {
    this.orderService.updateOrderDelivered(order).subscribe((order) => {
      this.orderSubject$.next(order);
    })
  }

  /**
   * Updates an orders confirmed status
   * @param order to change update status of
   */
  updateOrderConfirmed(order: Order): void {
    this.orderService.updateOrderConfirmed(order)
      .subscribe((newOrder) =>this.orderSubject$.next(newOrder));
    console.log(order);
  }

  /**
   * Updates paid status of order
   * @param order to change isPaid status of
   */
  updateOrderIsPaid(order: Order): void {
    this.orderService.updateIsPaid(order);
  }


  /**
   * Returns the id of the injected order that the dialog opens up with
   * @return the id of current order
   */
  getId(): number {
    let id = undefined;
    this.order$.subscribe((o) => id = o.id);
    return id;
  }

  /**
   * Adds or deletes meals from an order
   */
  updateOrderedMealItems() {
    if(this.data.order.meal.length > 0){
      this.order$.subscribe((order) => {
        this.orderedMealItemsSubject$.next(order.meal);
        this.total = order.total;
      })
    }
  }

  /**
   * Deletes this order
   */
  deleteOrder(): void {
    console.log(this.data.order.id);
    this.orderService.deleteOrderById(this.data.order.id);
    this.dialogRef.close();
  }

  /**
   * Adds a menu to the order
   * @param menu
   * @param order
   */
  addMenuToOrder(menu: Menu, order: Order) {
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

  /**
   * Save's the curent order and closes the dialog. Sends a reference of changed order back
   * to parent component.
   * @param order to save and send to parent component
   */
  save(order: Order) {
    console.log(this.orderSubject$.getValue());
    this.data.order = this.orderSubject$.getValue();
    this.orderedMealItemsSubject$.complete();
    this.orderedMealItemsSubject$.complete();
    this.dialogRef.close(order);
  }

  /**
   * Delete an ordered menu item from the current order
   * @param meal to remove from current order
   */
  deleteOrderedMenuItem(meal: Meal) {
    this.mealService.deleteMeal(meal).subscribe((deletedMeal) => console.log(deletedMeal));
    this.data.order.total -= meal.menu.price * meal.numberSelections;
    this.total = this.data.order.total;
    this.orderService.updateTotal(this.data.order);
  }
}
