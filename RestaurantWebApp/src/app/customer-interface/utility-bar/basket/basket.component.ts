import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Menu } from 'src/models/Menu';
import { UtilityBarComponent } from '../utility-bar.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: Menu[];
  
  constructor(private dialogRef: MatDialogRef<UtilityBarComponent>,
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

}
