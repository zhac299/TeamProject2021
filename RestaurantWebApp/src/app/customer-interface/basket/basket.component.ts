import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MealService } from '../../meal.service';
import { OrderService } from '../../order.service';
import { TableService } from '../../table.service';
import { Meal } from '../../../models/Meal';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})

/**
 * The class that handles the basket and placing an order.
 */
export class BasketComponent implements OnInit {

  /**
   * The meal list selected by the customer.
   */
  mealList: Meal[];
  
  /**
   * The order total of the meal list.
   */
  orderTotal: number = 0;

  /**
   * The customer id that is used by the customer service to make 
   * a get request.
   */
  customerId: number;

  /**
   * The table number that is used by the table service to make 
   * a get request.
   */
  tableNumber: number;

  /**
   * Indicates if the order was placed or not.
   */
  orderPlaced: boolean = false;

  /**
   * The constructor of the class. 
   * Injects the mat dialog data passed by the customer interface into the meal list,
   * customer id and table number.
   * 
   * @param snackBar a snack bar 
   * @param tableService the table service that is used to make get and put requests
   * @param mealService the meal service that is used to make get and post requests
   * @param orderService the order servic that is used to make get get and post requests
   * @param customerService the customer service that is used to make get requests
   * @param data the Mat Dialog data to be injected
   */
  constructor(
    private snackBar: MatSnackBar,
    private tableService: TableService,
    private mealService: MealService,
    private orderService: OrderService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.mealList = data.selectedMeals;
    this.customerId = data.customerId;
    this.tableNumber = data.tableNumber;
  }

  /**
   * A set up method that gets executed once when the class 
   * gets instantiated.
   * Intialises the order total.
   */
  ngOnInit(): void {
    this.getInitialOrderTotal();
  }

  /**
   * Calculates the intial order total(from the meal selection
   * injected from the customer interface).
   */
  getInitialOrderTotal() {
    for (let meal of this.mealList) {
      this.orderTotal += meal.menu.price * meal.numberSelections;
    }
  }

  /**
   * Deletes a meal from the selected meals list.
   * 
   * @param meal the meal item do be deleted
   */
  clear(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.orderTotal -= meal.menu.price * meal.numberSelections;
    if (index > -1) {
      this.mealList.splice(index, 1);
    }
  }

  /**
   * Adds a meal to the seletected meal list.
   * 
   * @param meal the meal to be added to the selected meal list
   */
  add(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.mealList[index].numberSelections++;
    this.orderTotal += meal.menu.price;
  }

  /**
   * Decreases the number of selections of a meal or, if meal nr of 
   * selections is 1, deletes it from the list. 
   * 
   * @param meal the meal to be removed from the selected meal list
   */
  remove(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.orderTotal -= meal.menu.price;
    if (this.mealList[index].numberSelections > 1) {
      this.mealList[index].numberSelections--;
    } else {
      this.mealList.splice(index, 1);
    }
  }

  /**
   * If the order was not placed, it subscribes to getTableByNumber() that returns
   * an observable of Table. Inside the subscription, it assigns a waiter to the order
   * and sets the table as ready. It subscribes to the getCustomerId() with the customerId
   * and it subscribes to createOrder() with the customer object returned by getCustomerById
   * and the order total to create a new order. Inside the subscription, it loops through
   * the meal list and creates the corresponding meals assigned to the order.
   * Opens a snack bar to inform the user than an order was placed.
   */
  placeOrder(): void {
    if (this.orderPlaced == false) {
      this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
        this.orderService.waiterId = table.waiterId;  
        table.isReady = true;
        this.tableService.updateTable(table);
      })       
      this.customerService.getCustomerByID(this.customerId).subscribe((customer) => {
        this.orderService.createNewOrder(customer, this.orderTotal).subscribe((order) => {
          for (var i = 0; i < this.mealList.length; i++) {
            this.mealList[i].order = order;
            this.mealService.createNewMeal(this.mealList[i]).subscribe();
          }
          this.mealList = [];
        });
      })
      this.orderPlaced = true;
      this.openSnackBar("You placed your order", "Enjoy!")
    }
  }

  /**
   * Opens a snack bar to display an informative message when the user places an order.
   * 
   * @param message the snack bar message
   * @param action the action to be done by the snack bar
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }
}
