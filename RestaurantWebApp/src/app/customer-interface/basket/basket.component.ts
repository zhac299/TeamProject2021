import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MealService } from '../../meal.service';
import { OrderService } from '../../order.service';
import { TableService } from '../../table.service';
import { Meal } from '../../../models/Meal';
import { CustomerService } from '../../customer.service';
import { CustomerInterfaceComponent } from '../customer-interface.component';
import { Router } from '@angular/router';
import { Order } from '../../../models/Order';
import { IngredientService } from '../../ingredient.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Meal[];
  orderTotal: number = 0;
  customerId: number;
  tableNumber: number;
  orders: Order[] = [];
  orderPlaced: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private tableService: TableService,
    private mealService: MealService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    private ingredientService: IngredientService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data) {
    this.mealList = data.selectedMeals;
    this.customerId = data.customerId;
    this.tableNumber = data.tableNumber;
  }

  ngOnInit(): void {
    this.getInitialOrderTotal();
  }

  getInitialOrderTotal() {
    for (let meal of this.mealList) {
      this.orderTotal += meal.menu.price * meal.numberSelections;
    }
  }

  clear(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.orderTotal -= meal.menu.price * meal.numberSelections;
    if (index > -1) {
      this.mealList.splice(index, 1);
    }
  }

  add(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.mealList[index].numberSelections++;
    this.orderTotal += meal.menu.price;
  }

  remove(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.orderTotal -= meal.menu.price;
    if (this.mealList[index].numberSelections > 1) {
      this.mealList[index].numberSelections--;
    } else {
      this.mealList.splice(index, 1);
    }
  }

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
            this.ingredientService.updateIngredient(())
          }
          this.mealList = [];
        });
      })
      this.orderPlaced = true;
      this.openSnackBar("You placed your order", "Enjoy!")
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

  navigateToPayment(orderId: number): void {
    this.router.navigate(['/payment'], 
          { queryParams: { 
            tableNumber: this.tableNumber,
            orderId: orderId, 
            customerId: this.customerId} });
    this.dialogRef.close();
  }
}
