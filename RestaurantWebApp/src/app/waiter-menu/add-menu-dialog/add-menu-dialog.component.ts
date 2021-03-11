import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../../models/Menu";
import { MatSliderChange } from '@angular/material/slider';
import {MenuFilterService} from "../../menu-filter.service";
import {MenuCategory} from "../../../models/MenuCategory";
import {selectedCategory} from "../../../models/selectedCategory";

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.sass']
})
export class AddMenuDialogComponent implements OnInit {
  selected = -1;
  categories: MenuCategory[];
  selectedCategory: MenuCategory;

  constructor(public dialogRef: MatDialogRef<AddMenuDialogComponent>,
              private menuFilterService: MenuFilterService,
              @Inject(MAT_DIALOG_DATA) public data: { menu:Menu,title:string }) { }

  ngOnInit(): void {
    this.menuFilterService.getMenuCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  setCalories(value: number) {
    return value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setData(menu:Menu) {
    this.data.menu = menu;
  }

  onCaloriesChange(event: MatSliderChange) {
    console.log(this.data.menu.calories);
    this.data.menu.calories = event.value;
  }

  changeCategory(category: MenuCategory) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
  }

  catContainsMenu(category: MenuCategory): boolean {
    if(category.menus.find((menu) => menu.name === this.data.menu.name)){
      this.selectedCategory = category;
      return true;
    } else return false;
  }

  closeDialog(): void {
    this.data.menu.category = this.selectedCategory;
    this.data.menu.category.menus = [];
    this.dialogRef.close(this.data.menu);
}
}
