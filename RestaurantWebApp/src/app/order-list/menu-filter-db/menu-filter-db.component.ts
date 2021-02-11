import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/models/Meal';
import { Order } from 'src/models/Order';
import { MenuFilterDbService } from './menu-filter-db.service';

@Component({
  selector: 'app-menu-filter-db',
  templateUrl: './menu-filter-db.component.html',
  styleUrls: ['./menu-filter-db.component.sass']
})
export class MenuFilterDBComponent implements OnInit {
  orderList: Meal[] = [];
  filter = "";

  constructor(private filterService: MenuFilterDbService) { }

    ngOnInit(): void {
        this.filterService.filter().subscribe( orders => {
            this.orderList = orders;
          });  
    }

    getFilteredMenu(): Meal[] {
      //console.log(this.orderList);
      return this.orderList;
    }
}
