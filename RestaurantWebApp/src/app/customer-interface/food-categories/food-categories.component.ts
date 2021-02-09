import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/menu-filter/filter.service';
import { selectedCategory } from 'src/models/selectedCategory';

@Component({
  selector: 'food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.sass']
})
export class FoodCategoriesComponent implements OnInit {
    cat: selectedCategory = new selectedCategory;
    constructor(private filterService: FilterService) { }

  ngOnInit(): void {
      this.cat = this.filterService.getCat();
    }
    /*
        TODO:
        Create a onFilter(cat) method in filterSevice
        Get the orderList from filterService and change cat so 'meal' contains new order objects.
        in filterService we can do:
        this.getOrders().subscribe( orders => {
            this.orderList = orders;
        }
    */

}
