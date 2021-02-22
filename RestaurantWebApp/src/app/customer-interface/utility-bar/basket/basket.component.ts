import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UtilityBarComponent } from '../utility-bar.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  mealList: string[];
  
  constructor(private dialogRef: MatDialogRef<UtilityBarComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.mealList = data;
    }

  ngOnInit(): void {
    console.log(this.mealList);
  }

}
