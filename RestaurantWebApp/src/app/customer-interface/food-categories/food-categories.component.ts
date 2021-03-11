import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../menu.service";
import {MenuFilterService} from "../../menu-filter.service";
import {MenuCategory} from "../../../models/MenuCategory";
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.sass'],
})
export class FoodCategoriesComponent implements OnInit {

  categories: MenuCategory[];

  constructor() { }

  ngOnInit(): void {}

}
