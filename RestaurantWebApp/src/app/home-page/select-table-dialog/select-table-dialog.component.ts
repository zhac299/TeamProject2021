import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../models/Customer';
import { Order } from '../../../models/Order';
import { Table } from '../../../models/Table';
import { CustomerService } from '../../customer.service';
import { TableService } from '../../table.service';

@Component({
  selector: 'select-table-dialog',
  templateUrl: './select-table-dialog.component.html',
  styleUrls: ['./select-table-dialog.component.sass']
})

/**
 * The class that handles the select table dialog at the customer login.
 */
export class SelectTableDialogComponent implements OnInit {

  /**
   * The list of available tables.
   */
  tables: Table[] = [];

  /**
   * The selected table.
   */
  selectedTable: Table = null;

  /**
   * The Customer object.
   */
  customer: Customer;

  /**
   * The customer orders.
   */
  orders: Order[] = [];

  /**
   * The constructor of the class.
   * 
   * @param router the router that is used for the activated route to the customer menu
   * @param tableService the table service that is used to make get requests.
   * @param customerService 
   * @param dialogRef 
   */
  constructor(
    private router: Router,
    private tableService: TableService,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<SelectTableDialogComponent>) { }

  ngOnInit(): void {
    this.tableService.getUnoccupiedTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  createNewCustomer(): void {
    this.customer = new Customer();
    this.customer.table = this.selectedTable;
    this.customer.orders = this.orders;
  }

  forCustomer(): void {
    if (this.selectedTable != null) {
      this.createNewCustomer();
      this.tableService.assignTable(this.selectedTable).subscribe((obj) => {
        this.customerService.createCustomer(this.customer).subscribe((newCustomer) => {
          this.router.navigate(['/customer-menu'],
            { queryParams: { customerID: newCustomer.id, selectedTable: this.selectedTable.tableNumber } });
        });
      });
    }
    this.dialogRef.close();
  }

}
