import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer.service';
import { TableService } from 'src/app/table.service';
import { Table } from 'src/models/Table';
import { CustomerInterfaceComponent } from '../customer-interface.component';

import { CallWaiterDialogComponent } from './call-waiter-dialog/call-waiter-dialog.component';

@Component({
  selector: 'call-waiter',
  templateUrl: './call-waiter.component.html',
  styleUrls: ['./call-waiter.component.sass']
})
export class CallWaiterComponent implements OnInit {

  tables: Table[] = [];
  selectedTable: Table;
  waiterCalled: boolean = false;

  constructor(
    private customerInterface: CustomerInterfaceComponent,
    private tableService: TableService) { }

  ngOnInit(): void {}

  callWaiter(): void {
    this.customerInterface.customer.subscribe((newCustomer) => {
      console.log(newCustomer.table);
      this.tableService.updateTable(newCustomer.table).subscribe();
      this.waiterCalled = true;
    });
  }
  
}