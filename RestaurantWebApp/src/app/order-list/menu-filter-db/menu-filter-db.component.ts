import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';
import { MenuFilterDbService } from './menu-filter-db.service';

@Component({
  selector: 'app-menu-filter-db',
  templateUrl: './menu-filter-db.component.html',
  styleUrls: ['./menu-filter-db.component.sass']
})
export class MenuFilterDBComponent implements OnInit {
  orderList: Order[] = [];
  filter = "";

  constructor(private filterService: MenuFilterDbService) { }

    ngOnInit(): void {
        this.filterService.filter().subscribe( orders => {
            this.orderList = orders;
          });  
    }

    filterMenu(): void {
      this.filterService.filter();
    }
}
