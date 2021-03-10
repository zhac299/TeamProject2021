import { Component, OnInit } from '@angular/core';
import {TableService} from "../table.service";
import {Table} from "../../models/Table";

@Component({
  selector: 'app-tables-list-display',
  templateUrl: './tables-list-display.component.html',
  styleUrls: ['./tables-list-display.component.sass']
})
export class TablesListDisplayComponent implements OnInit {

  constructor(public tableService: TableService) { }

  tableList: Table[] = [];

  ngOnInit(): void {
    this.tableService.getUpdatedTables()
    this.tableService.tables$.subscribe((tables) => {
      this.tableList = tables;
    })
  }

  createNewTable(): void {
    this.tableService.createTable().subscribe();
  }

}
