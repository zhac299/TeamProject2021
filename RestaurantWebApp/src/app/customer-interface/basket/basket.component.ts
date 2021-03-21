import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MealService } from '../../meal.service';
import { OrderService } from '../../order.service';
import { TableService } from '../../table.service';
import { Customer } from '../../../models/Customer';
import { Meal } from '../../../models/Meal';
import { Table } from '../../../models/Table';
import { CustomerService } from '../../customer.service';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Meal[];
  orderPlaced: Boolean;
  orderTotal: number = 0;
  customerId: number;
  tableNumber: number;

  constructor(
    private snackBar: MatSnackBar,
    private tableService: TableService,
    private mealService: MealService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.mealList = data.selectedMeals;
    this.customerId = data.customerId;
    this.tableNumber = data.tableNumber;
  }

  ngOnInit(): void {
    this.customerService.refreshNeeded.subscribe(() => {
      this.updateOrderPlaced();
    })
    this.updateOrderPlaced();
    this.getInitialOrderTotal();
  }

  getInitialOrderTotal() {
    for (let meal of this.mealList) {
      this.orderTotal += meal.menu.price * meal.numberSelections;
    }
  }

  updateOrderPlaced(): void {
    this.customerService.getCustomerByID(this.customerId).subscribe((customer) => {
      if (customer.orders.length == 0) {
        this.orderPlaced = false;
      } else {
        this.orderPlaced = true;
      }
    })
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
        this.tableService.updateTable(table).subscribe();
      })
         
      this.customerService.getCustomerByID(this.customerId).subscribe((customer) => {
        this.orderService.createNewOrder(customer, this.orderTotal).subscribe((order) => {
          for (var i = 0; i < this.mealList.length; i++) {
            this.mealList[i].order = order;
            this.mealService.createNewMeal(this.mealList[i]).subscribe();
          }
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

  close(): void {
    this.dialogRef.close(this.orderPlaced);
  }
}
