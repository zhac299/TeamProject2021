import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface MealList {
  meal: 'fajita' | 'burito';
}
@Component({
  selector: 'utility-bar',
  templateUrl: './utility-bar.component.html',
  styleUrls: ['./utility-bar.component.sass']
})
export class UtilityBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        mealList: 'fajita'
      }
    });
  }
}
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MealList) {}
}
