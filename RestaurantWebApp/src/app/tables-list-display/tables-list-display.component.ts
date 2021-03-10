import { Component, OnInit } from '@angular/core';
import {TableService} from "../table.service";
import {Table} from "../../models/Table";
import {Subscription, timer} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-tables-list-display',
  templateUrl: './tables-list-display.component.html',
  styleUrls: ['./tables-list-display.component.sass']
})
export class TablesListDisplayComponent implements OnInit {

  constructor(public tableService: TableService) { }

  tableList: Table[] = [];
  subscription: Subscription;
  refreshTimer$ = timer(0, 5000)
    .pipe(tap(() => console.log('Fetching Tables...')));

  ngOnInit(): void {
    this.tableService.getUpdatedTables()
    this.tableService.tables$.subscribe((tables) => {
      this.tableList = tables;
    })
    this.subscription = this.refreshTimer$.subscribe(this.tableService.refresh$);
  }

  createNewTable(): void {
    this.tableService.createTable().subscribe();
  }

}
