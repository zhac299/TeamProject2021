import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/menu-filter/filter.service';
import { selectedCategory } from 'src/models/selectedCategory';
import {MenuService} from "../../menu.service";

@Component({
  selector: 'food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.sass']
})
export class FoodCategoriesComponent implements OnInit {
    constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    }

    onClick(name:string): void{
      this.menuService.modifyCat(name);
    }

}