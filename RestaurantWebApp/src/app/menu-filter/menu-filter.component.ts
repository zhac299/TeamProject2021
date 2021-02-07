import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.sass']
})
export class MenuFilterComponent implements OnInit {
    orderList: Order[] = []

    filter: string = "";
  constructor(private filterService: FilterService) { }

    ngOnInit(): void {
        this.filterService.getOrders().subscribe( orders => {
            this.orderList = orders;
          });  
    }
    
    filterMenu() { 
        this.filter = this.filter;
        console.log(this.filter);
        this.filter = "";

    }

}
