import { Component, Input, OnInit } from '@angular/core';
import {TableService} from "../table.service";
import {Table} from "../../models/Table";
import {fromEvent, Subscription, timer} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Staff } from '../../models/Staff';

@Component({
  selector: 'app-tables-list-display',
  templateUrl: './tables-list-display.component.html',
  styleUrls: ['./tables-list-display.component.sass']
})
export class TablesListDisplayComponent implements OnInit {

  constructor(
    public tableService: TableService,
    private snackBar: MatSnackBar) { }

  tableList: Table[] = [];
  subscription: Subscription;

  refreshTimer$ = timer(0, 5000).pipe(tap(() => console.log('Fetching Tables...')));
  ORDER_BUTTON_WIDTH = 300;
  resize$ = fromEvent(window, 'resize');
  windowWidth: number = Math.floor(window.innerWidth/this.ORDER_BUTTON_WIDTH);

  @Input() isWaiter: boolean;
  waiter: Staff;
  
  ngOnInit(): void {
    this.tableService.getUpdatedTables()
    
    if (!this.isWaiter) {
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
    } else {
      this.tableService.tables$.pipe(
        map((tables) => tables.filter(table => table.waiterId == this.tableService.currentStaff))
      ).subscribe((tables) => {
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
  }

  markAsHelped(table: Table): void {
    if(table.needsHelp) {
      this.tableService.getTableByNumber(table.tableNumber).subscribe((updatedTable) => {
        updatedTable.needsHelp = false;
        this.tableService.updateTable(updatedTable).subscribe();
      })     
      this.openSnackBar("Table was marked as helped!","Close");
    } else {
      this.openSnackBar("Table doesn't need help!","Close");
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

}
