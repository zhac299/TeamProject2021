import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Menu } from 'src/models/Menu';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Menu[];
  
  constructor(private dialogRef: MatDialogRef<CustomerInterfaceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mealList = data;
    }

  ngOnInit(): void {
    console.log(this.mealList);
  }

  clear(meal: Menu): void {
    const index = this.mealList.indexOf(meal, 0);
    if (index > -1) {
      this.mealList.splice(index, 1);
    }
  }

  add(meal: Menu): void {
    const index = this.mealList.indexOf(meal, 0);
    this.mealList[index].selections++;
  }

  remove(meal: Menu): void {
    const index = this.mealList.indexOf(meal, 0);
    if(this.mealList[index].selections > 1){
      this.mealList[index].selections--;
    } else {
      this.mealList.splice(index, 1);
    }
  }

  priceTotal(mealList: Menu[]): number {
    let total: number = 0;
    for(let i = 0; i < this.mealList.length; i++) {
      total += this.mealList[i].price * this.mealList[i].selections
    }
    return total;
  }
}
