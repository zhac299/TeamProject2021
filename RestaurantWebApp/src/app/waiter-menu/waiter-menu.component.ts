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

  ngOnInit(): void {
    this.tableService.getTables().subscribe( orders => {
      this.tableList = orders;
    });
  }

}
