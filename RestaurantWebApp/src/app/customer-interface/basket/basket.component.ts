import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MealService } from 'src/app/meal.service';
import { OrderService } from 'src/app/order.service';
import { Customer } from 'src/models/Customer';
import { Meal } from 'src/models/Meal';
import { Order } from 'src/models/Order';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Meal[];
  customerObservable: Observable<Customer>;
  customer: Customer;
  orderPlaced: Boolean;
  
  constructor(
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    private mealService: MealService,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mealList = data.selectedMeals;
      this.customerObservable = data.customer;
    }

  async ngOnInit(): Promise<void> {

    this.customer = await this.customerObservable.pipe(take(1)).toPromise();
    if (this.customer.orders.length == 0) {
      this.orderPlaced = false;
    } else {
      this.orderPlaced = true;
    }
    console.log(this.orderPlaced);
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
  }

  clear(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    if (index > -1) {
      this.mealList.splice(index, 1);
    }
  }

  add(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    this.mealList[index].numberSelections++;
  }

  remove(meal: Meal): void {
    const index = this.mealList.indexOf(meal, 0);
    if(this.mealList[index].numberSelections > 1){
      this.mealList[index].numberSelections--;
    } else {
      this.mealList.splice(index, 1);
    }
  }

  priceTotal(): number {
    let total: number = 0;
    for(let i = 0; i < this.mealList.length; i++) {
      total += this.mealList[i].menu.price * this.mealList[i].numberSelections;
    }
    return total;
  }

  placeOrder(): void {
    if(this.orderPlaced == false) {
        this.orderService.createNewOrder(this.customer, this.priceTotal()).subscribe((order) => {
          for(var i = 0 ; i < this.mealList.length; i++) {
            this.mealList[i].order = order;
            this.mealService.createNewMeal(this.mealList[i]).subscribe();
          }
        });
      this.orderPlaced = true;
      this.openSnackBar("You placed your order","Enjoy!")
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
