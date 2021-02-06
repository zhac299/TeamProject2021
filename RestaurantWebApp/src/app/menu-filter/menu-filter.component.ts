import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/Order';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.sass']
})
export class MenuFilterComponent implements OnInit {

    filter: string = "";
  constructor() { }

  ngOnInit(): void {
    }
    
    filterMenu() { 
        this.filter = this.filter;
        console.log(this.filter);

    }

}
