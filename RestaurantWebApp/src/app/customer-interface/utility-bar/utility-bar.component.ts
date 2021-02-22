import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BasketComponent } from './basket/basket.component';

@Component({
  selector: 'utility-bar',
  templateUrl: './utility-bar.component.html',
  styleUrls: ['./utility-bar.component.sass']
})
export class UtilityBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  mealList: string[] = ['fajita', 'burito'];

  ngOnInit(): void {}

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.mealList;

    const dialogRef = this.dialog.open(BasketComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}