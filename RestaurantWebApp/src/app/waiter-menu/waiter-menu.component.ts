import { Component, OnInit } from '@angular/core';
import {TableService} from '../table.service';
import {Table} from '../../models/Table';

@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.sass']
})
export class WaiterMenuComponent implements OnInit {

  constructor(private tableService: TableService) { }

  tableList: Table[] = [];
  freeTables = 0;

  ngOnInit(): void {
    this.tableService.getTables().subscribe( orders => {
      // checks which incoming tables have orders
      for (const table of orders){
        // updates counter
        if (table.hasOrder){this.freeTables++; }
      }
      this.tableList = orders;
    });
  }

}
