import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../customer.service';
import { TableService } from '../../table.service';
import { Table } from '../../../models/Table';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'ready-to-order',
  templateUrl: './ready-to-order.component.html',
  styleUrls: ['./ready-to-order.component.sass']
})
export class ReadyToOrderComponent implements OnInit {

  ready: boolean;
  tableNumber: number;

  constructor(
    private customerInterface: CustomerInterfaceComponent, 
    private tableService: TableService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tableNumber = this.customerInterface.paramsObject.params.selectedTable;
    this.getReadyToOrder();
  }

  getReadyToOrder(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      this.ready = table.isReady;
    })
  }

  readyToOrder(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      table.isReady = true;
      this.tableService.updateTable(table).subscribe();
    })
    this.ready = true;
    this.openSnackBar("A waiter will come to take your order", "Please Wait")
  }

  cancel(): void {
    this.tableService.getTableByNumber(this.tableNumber).subscribe((table) => {
      table.isReady = false;
      this.tableService.updateTable(table).subscribe();
    })
    this.ready = false;
    this.openSnackBar("You canceled the waiter call","Still need help?");
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

}
