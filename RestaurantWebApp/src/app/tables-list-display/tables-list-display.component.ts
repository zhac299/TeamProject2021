import { Component, OnInit } from '@angular/core';
import {TableService} from "../table.service";
import {Table} from "../../models/Table";
import {fromEvent, Subscription, timer} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";

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
  ORDER_BUTTON_WIDTH = 300;
  resize$ = fromEvent(window, 'resize');
  windowWidth: number = Math.floor(window.innerWidth/this.ORDER_BUTTON_WIDTH);

  ngOnInit(): void {
    this.tableService.getUpdatedTables()
    this.tableService.tables$.subscribe((tables) => {
      this.tableList = tables;
    })
    this.subscription = this.refreshTimer$.subscribe(this.tableService.refresh$);
    this.resize$
      .pipe(debounceTime(250),
        tap(evt=>console.log('window.innerWidth=', window.innerWidth, this.windowWidth)),
      )
      .subscribe((w) => {
        this.windowWidth = Math.floor(window.innerWidth / this.ORDER_BUTTON_WIDTH
        )});
  }

  createNewTable(): void {
    this.tableService.createTable().subscribe();
  }

}
