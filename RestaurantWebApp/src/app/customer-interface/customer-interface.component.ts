import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';


import {MenuService} from "../menu.service";
import {MenuFilterService} from "../menu-filter.service";
import { Menu } from "../../models/Menu";
import { selectedCategory } from "../../models/selectedCategory";
import {OrderService} from "../order.service";
import { Meal } from 'src/models/Meal';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BasketComponent} from "./utility-bar/basket/basket.component";

interface Food {
  viewValue: string;
  mappedOrders: Order[];
  selected: boolean;
}

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass'],
})
export class CustomerInterfaceComponent implements OnInit {
    menu: Menu[];
    selectedMeals: Menu[] = [];
    cat: selectedCategory = new selectedCategory;

  constructor(private menuService: MenuService,
              private menuFilterService: MenuFilterService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe((menu)=> {
        this.menu=menu;
    });
    this.cat = this.menuService.getCat();
  }

  filter(filterArgs: string): void {
      this.menuFilterService.filter(filterArgs).subscribe(orders => {
          this.menuService.setCat(orders);
    });
  }

  addMeal(menuItem: Menu): void {
    if (!this.selectedMeals.includes(menuItem)) {
      menuItem.selections = 1;
      this.selectedMeals.push(menuItem);
    } else {
      let index: number = this.selectedMeals.indexOf(menuItem);
      this.selectedMeals[index].selections += 1;
    }
    console.log(this.selectedMeals);
  }

  removeMeal(menuItem: Menu): void {
    if (this.selectedMeals.includes(menuItem)) {
      let index: number = this.selectedMeals.indexOf(menuItem);
      this.selectedMeals[index].selections -= 1;
      if(this.selectedMeals[index].selections == 0){
        this.selectedMeals.splice(index);
      }
    }
    console.log(this.selectedMeals);
  }

  clearMeal(menuItem:Menu): void {
    if (this.selectedMeals.includes(menuItem)) {
      let index: number = this.selectedMeals.indexOf(menuItem);
      this.selectedMeals.splice(index);
    }
    console.log(this.selectedMeals);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedMeals;

    const dialogRef = this.dialog.open(BasketComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
