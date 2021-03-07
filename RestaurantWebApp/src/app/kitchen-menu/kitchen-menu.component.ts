import {Component, OnInit} from '@angular/core';
import {Table} from "../../models/Table";
import {Order} from "../../models/Order";

@Component({
  selector: 'app-kitchen-menu',
  templateUrl: './kitchen-menu.component.html',
  styleUrls: ['./kitchen-menu.component.sass']
})
export class KitchenMenuComponent implements OnInit {

  showFiller = false;
  tableList: Table[] = [];
  freeTables = 0;
  orders: Order[];
  displayedColumns: string[] = ['name', 'description', 'price'];
  getOrders = true;

  constructor() {}

  ngOnInit(): void {}

}
