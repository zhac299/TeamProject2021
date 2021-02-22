import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';


import {MenuService} from "../menu.service";
import {MenuFilterService} from "../menu-filter.service";
import { Menu } from "../../models/Menu";
import { selectedCategory } from "../../models/selectedCategory";
import {OrderService} from "../order.service";
import { Meal } from 'src/models/Meal';

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
              private menuFilterService: MenuFilterService) { }

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
    this.selectedMeals.push(menuItem);
    console.log(this.selectedMeals);
  }
}
