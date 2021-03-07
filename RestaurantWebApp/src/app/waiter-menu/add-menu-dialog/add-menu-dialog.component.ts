import {Component, Inject, OnInit} from '@angular/core';
import {MenuService} from "../../menu.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../../models/Menu";
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.sass']
})
export class AddMenuDialogComponent implements OnInit {
  selected = -1;
  constructor(public dialogRef: MatDialogRef<AddMenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { menu:Menu,title:string }) { }

  ngOnInit(): void {}

  setCalories(value: number) {
    return value;
  }

  onNoClick(): void {
    console.log(this.data.menu);
    this.dialogRef.close();
  }

  addMenuItem(): void {
    // this.menuService.createMenuItem(this.data)
    //   .subscribe( result => {
    //     return result;
    //   });
  }

  setData(menu:Menu) {
    this.data.menu = menu;
  }

  onCaloriesChange(event: MatSliderChange) {
    console.log(this.data.menu.calories);
    this.data.menu.calories = event.value;
  }

  onClick(type: string) {
    this.data.menu.category = type;
}
}
