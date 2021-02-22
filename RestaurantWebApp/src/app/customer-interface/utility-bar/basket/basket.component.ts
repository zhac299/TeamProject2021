import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UtilityBarComponent } from '../utility-bar.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  constructor(private utilityBarComponent: UtilityBarComponent, @Inject(MAT_DIALOG_DATA) public data: selectedMeal) {}

  ngOnInit(): void {
  }

}
