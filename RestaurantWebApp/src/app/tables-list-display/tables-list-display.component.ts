import { Component, Input, OnInit } from '@angular/core';
import {TableService} from "../table.service";
import {Table} from "../../models/Table";
import {fromEvent, Subscription, timer} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Staff } from '../../models/Staff';

/**
 * A reusable component to display a list of Tables. isWaiter property is used to display only
 * tables that are relevant to the waiter.
 */
@Component({
  selector: 'app-tables-list-display',
  templateUrl: './tables-list-display.component.html',
  styleUrls: ['./tables-list-display.component.sass']
})
export class TablesListDisplayComponent implements OnInit {

  /**
   *
   * @param tableService to perform crud operations for tables
   * @param snackBar Snackbar that pops up to show messages
   */
  constructor(
    public tableService: TableService,
    private snackBar: MatSnackBar) { }

  /**
   * List of tables displayed
   */
  tableList: Table[] = [];

  /**
   * A subscription that uses the timer to get new data from the API
   */
  subscription: Subscription;

  /**
   * A refresh timer that ticks every second
   */
  refreshTimer$ = timer(0, 1000).pipe(tap());

  /**
   * Minimum size of each table button
   */
  ORDER_BUTTON_WIDTH = 300;

  /**
   * An event listener that emits a new value every
   * time the window changes
   */
  resize$ = fromEvent(window, 'resize');

  /**
   * Number of columns that the width should take up for each row
   */
  windowWidth: number = Math.floor(window.innerWidth/this.ORDER_BUTTON_WIDTH);

  /**
   * Property a parent component can use to display
   * specific tables (true) or all tables (false)
   */
  @Input() isWaiter: boolean;

  /**
   * The staff that logs in to the component
   */
  waiter: Staff;

  /**
   * Gets all tables depending on if the staff is a manager. Gets specific tables
   * if the staff is a waiter. Also sets the
   */
  ngOnInit(): void {
    this.tableService.getUpdatedTables()

    if (!this.isWaiter) {
      this.tableService.tables$.subscribe((tables) => {
        this.tableList = tables;
      })
      this.subscription = this.refreshTimer$.subscribe(this.tableService.refresh$);
      this.resize$
        .pipe(debounceTime(250),
          tap(),
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
          tap(),
        )
        .subscribe((w) => {
          this.windowWidth = Math.floor(window.innerWidth / this.ORDER_BUTTON_WIDTH
          )});
    }
  }

  /**
   * Marks a table to helped if it is clicked on and displays snackbar message
   * @param table to marked as helped
   */
  markAsHelped(table: Table): void {
    if(table.needsHelp) {
      this.tableService.getTableByNumber(table.tableNumber).subscribe((updatedTable) => {
        updatedTable.needsHelp = false;
        this.tableService.updateTable(updatedTable);
      })
      this.openSnackBar("Table was marked as helped!","Close");
    } else {
      this.openSnackBar("Table doesn't need help!","Close");
    }
  }

  /**
   * Opens the snackbar with a message as well as an action with a string title
   * @param message to display
   * @param action that acts as a title to the action
   * @private
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

}
