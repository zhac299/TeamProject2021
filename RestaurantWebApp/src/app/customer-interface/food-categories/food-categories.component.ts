import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.sass']
})
export class FoodCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
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
