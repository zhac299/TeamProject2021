import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/menu-filter/filter.service';
import { selectedCategory } from 'src/models/selectedCategory';

@Component({
  selector: 'food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.sass']
})
export class FoodCategoriesComponent implements OnInit {
    constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    }

    onClick(name:string): void{
      this.filterService.modifyCat(name);
    }

}
