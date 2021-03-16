import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/table.service';
import { Table } from 'src/models/Table';
import { CustomerInterfaceComponent } from '../customer-interface.component';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'call-waiter',
  templateUrl: './call-waiter.component.html',
  styleUrls: ['./call-waiter.component.sass']
})
export class CallWaiterComponent implements OnInit {

  tables: Table[] = [];
  waiterCalled: boolean = false;

  constructor(
    private customerInterface: CustomerInterfaceComponent,
    private tableService: TableService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  callWaiter(): void {
    this.customerInterface.table.subscribe((table) => {
      console.log(table);
      table.needsHelp = true;
      this.tableService.updateRestaurantTableNeedsHelp(table,true).subscribe();
    });
    this.waiterCalled = true;
    this.openSnackBar("A waiter will come to you","Please Wait");
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

  cancel(): void {
    this.customerInterface.table.subscribe((table) => {
      table.needsHelp = false;
      this.tableService.updateRestaurantTableNeedsHelp(table,false).subscribe();
    });
    this.waiterCalled = false;
    this.openSnackBar("You canceled the waiter call","Still need help?");
  }
  
}