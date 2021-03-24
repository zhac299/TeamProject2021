import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerInterfaceComponent } from '../customer-interface.component';
import { TableService } from '../../table.service';

@Component({
  selector: 'call-waiter',
  templateUrl: './call-waiter.component.html',
  styleUrls: ['./call-waiter.component.sass']
})

/**
 * The class that handles calling the waiter.
 */
export class CallWaiterComponent implements OnInit {

  /**
   * Indicates if the waiter was called or not changes
   * the button accordingly.
   */
  waiterCalled: boolean;

  /**
   * The table number that is used when making get and post requests.
   */
  tableNumber: number;

  /**
   * The constructor of the class.
   * 
   * @param customerInterface a customer interface instance
   * @param tableService the table service that is used to make get and post requests
   * @param snackBar a snack bar
   */
  constructor(
    private customerInterface: CustomerInterfaceComponent,
    private tableService: TableService,
    private snackBar: MatSnackBar) { }

  /**
   * Set-up method only called once when the class gets instantiated.
   * Sets the table number with the the table number from the customer interface.
   * It subscribes to the refreshNeeded Subject to listen to DB changes and handle
   * them instantly and calls getNeedHelp().
   */
  ngOnInit(): void {
    this.tableNumber = this.customerInterface.paramsObject.params.selectedTable;
    this.tableService.refreshNeeded.subscribe(() => {
      this.getNeedHelp();
    })
    this.getNeedHelp();
  }

  /**
   * Makes a get request, subscribing to getTableByNumber() with the table number that returns an
   * Table Observable. Inside the subscription it updates the waiterCalled field.
   */
  getNeedHelp(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      this.waiterCalled = table.needsHelp;
    })
  }

  /**
   * Subscribes to getTableByNumber() with the the table number that returns an 
   * Table Observable. Inside the subscription, it makes a post request to update the
   * table.NeedsHelp to true. Opens a snack bar to inform the user a waiter was called.
   */
  callWaiter(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      table.needsHelp = true;
      this.tableService.updateTable(table);
    })
    this.openSnackBar("A waiter will come to you", "Please Wait");
  }

  /**
   * Subscribes to getTableByNumber() with the the table number that returns an 
   * Table Observable. Inside the subscription, it makes a post request to update the
   * table.NeedsHelp to false. Opens a snack bar to inform the user the waiter call was canceled.
   */
  cancel(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      table.needsHelp = false;
      this.tableService.updateTable(table);
    })
    this.openSnackBar("You canceled the waiter call", "Still need help?");
  }

  /**
   * Opens a snack bar with an informative message.
   * 
   * @param message the message of the snack bar
   * @param action the action of the snack bar
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

}