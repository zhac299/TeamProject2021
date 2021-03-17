import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MealService } from 'src/app/meal.service';
import { OrderService } from 'src/app/order.service';
import { TableService } from 'src/app/table.service';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
import { Table } from 'src/models/Table';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Meal[];
  customerObservable: Observable<Customer>;
  tableObservable: Observable<Table>;
  customer: Customer;
  table: Table;
  orderPlaced: Boolean;
  orderTotal: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private tableService: TableService,
    private mealService: MealService,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.mealList = data.selectedMeals;
    this.customerObservable = data.customer;
    this.tableObservable = data.table;
    for (let meal of this.mealList) {
      this.orderTotal += meal.menu.price * meal.numberSelections;
    }
  }

  async ngOnInit(): Promise<void> {
    this.customer = await this.customerObservable.pipe(take(1)).toPromise();
    this.table = await this.tableObservable.pipe(take(1)).toPromise();
    if (this.customer.orders.length == 0) {
      this.orderPlaced = false;
    } else {
      this.orderPlaced = true;
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
      this.orderService.createNewOrder(this.customer, this.orderTotal).subscribe((order) => {
        for (var i = 0; i < this.mealList.length; i++) {
          this.mealList[i].order = order;
          this.mealService.createNewMeal(this.mealList[i]).subscribe();
        }
      });
      this.table.isReady = true;
      this.tableService.updateRestaurantTableReadyToOrder(this.table, true).subscribe();
      this.orderPlaced = true;
      this.openSnackBar("You placed your order", "Enjoy!")
    }
  }

  getMealList(): Meal[] {
    console.log(this.mealList);
    return this.mealList;
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
