import {Component, Inject, OnInit} from '@angular/core';
import {MenuService} from "../../menu.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {Menu} from "../../../models/Menu";
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.sass']
})
export class AddMenuDialogComponent implements OnInit {
  selected = -1;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              private menuService: MenuService,
              @Inject(MAT_DIALOG_DATA) public data: Menu) { }

  ngOnInit(): void {}

  setCalories(value: number) {
    return value;
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  addMenuItem(): void {
    // this.menuService.createMenuItem(this.data)
    //   .subscribe( result => {
    //     return result;
    //   });
  }

  setData(menu:Menu) {
    this.data = menu;
    }
}
