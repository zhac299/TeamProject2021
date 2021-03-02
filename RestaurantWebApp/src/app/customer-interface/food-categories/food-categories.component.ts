import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../menu.service";
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
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {}

  foodCategories: String[];

  onClick(name:string): void{
    this.menuService.modifyCat(name);
  }

  tiles: Tile[] = [
    {text: 'Fajita', cols: 1, rows: 1, color: '#3b0d0d'},
    {text: 'Nachos', cols: 1, rows: 1, color: '#3d0a0a'},
    {text: 'Dips', cols: 1, rows: 1, color: '#3d0a0a'},
    {text: 'Desserts', cols: 1, rows: 1, color: '#3d0a0a'},
  ];

}
