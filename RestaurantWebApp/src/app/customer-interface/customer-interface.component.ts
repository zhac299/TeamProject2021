import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';


import {MenuService} from "../menu.service";
import {MenuFilterService} from "../menu-filter.service";
import { Menu } from "../../models/Menu";
import { selectedCategory } from "../../models/selectedCategory";

interface Food {
  viewValue: string;
  mappedOrders: Order[];
  selected: boolean;
}

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass']
})
export class CustomerInterfaceComponent implements OnInit {
    menu: Menu[];
    cat: selectedCategory = new selectedCategory;

  constructor(private menuService: MenuService,
              private menuFilterService: MenuFilterService) { }

  ngOnInit(): void {
    this.menuService.refreshNeeded.subscribe(()=> {
        this.cat = this.menuService.getCat();
    });
    this.cat = this.menuService.getCat();
  }

  filter(filterArgs: string): void {
      this.menuFilterService.filter(filterArgs).subscribe(orders => {
          this.menuService.setCat(orders);
    });
  }
}
