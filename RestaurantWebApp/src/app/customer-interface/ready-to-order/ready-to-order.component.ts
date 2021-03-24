import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TableService } from '../../table.service';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'ready-to-order',
  templateUrl: './ready-to-order.component.html',
  styleUrls: ['./ready-to-order.component.sass']
})

/**
 * The class that handles the ready to order action.
 */
export class ReadyToOrderComponent implements OnInit {

  /**
   * Indicates if the table is ready to order or not.
   */
  ready: boolean;

  /**
   * The table number that is used to make get requests.
   */
  tableNumber: number;

  /**
   * The construcotr of the class.
   * 
   * @param customerInterface a customer interface instance
   * @param tableService the table service that is used to make get and put requests.
   * @param snackBar a snack bar
   */
  constructor(
    private customerInterface: CustomerInterfaceComponent,
    private tableService: TableService,
    private snackBar: MatSnackBar) { }

  /**
   * Set-up method that is gets called once when the class is instantiated.
   * It sets tableNumber and calls getReadyToOrder() to updated the order status.
   */
  ngOnInit(): void {
    this.tableNumber = this.customerInterface.paramsObject.params.selectedTable;
    this.getReadyToOrder();
  }

  /**
   * Sets ready to order with the value from the db.
   * It makes a get request to the Table DB to get the table, 
   * subscribing to getTableByNumber() that returns a Table Observable.
   * Inside the subscription, it sets table.ready.
   */
  getReadyToOrder(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      this.ready = table.isReady;
    })
  }

  /**
   * Updates the table as ready to order.
   * It makes a get request to the Table DB to get the table, 
   * subscribing to getTableByNumber() that retuns a Table Observable.
   * Inside the subscription, it makes a put request to the Table DB to 
   * update table.isReady to true by calling updateTable().
   */
  readyToOrder(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      table.isReady = true;
      this.tableService.updateTable(table);
    })
    this.ready = true;
    this.openSnackBar("A waiter will come to take your order", "Please Wait")
  }

  /**
   * Updates the table as not ready to order.
   * It makes a get request to the Table DB to get the table, 
   * subscribing to getTableByNumber() that retuns a Table Observable.
   * Inside the subscription, it makes a put request to the Table DB to 
   * update table.isReady to false by calling updateTable()
   */
  cancel(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      table.isReady = false;
      this.tableService.updateTable(table);
    })
    this.ready = false;
    this.openSnackBar("You canceled the waiter call", "Still need help?");
  }

  /**
   * Opens a snack bar that informs the table is marked as ready to order
   * 
   * @param message the snack bar message
   * @param action the action of the snackbar
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

}
