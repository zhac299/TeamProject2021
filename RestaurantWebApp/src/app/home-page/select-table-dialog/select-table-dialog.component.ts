import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';

import { TableService } from 'src/app/table.service';
import { Customer } from 'src/models/Customer';
import { Order } from 'src/models/Order';
import { Table } from 'src/models/Table';

@Component({
  selector: 'select-table-dialog',
  templateUrl: './select-table-dialog.component.html',
  styleUrls: ['./select-table-dialog.component.sass']
})
export class SelectTableDialogComponent implements OnInit {

  tables: Table[] = [];
  selectedTable: Table = null;
  customer: Customer;
  orders: Order[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.tableService.getUnoccupiedTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  createNewCustomer(): void {
    this.customer = new Customer();
    this.customer.table = this.selectedTable;
    this.customer.id = Math.floor(Math.random() * (1000000 - 0 + 1));;
    this.customer.isReady = false;
    this.customer.orders = this.orders;
  }

  forCustomer(): void { 
    if (this.selectedTable != null) {
      //console.log(this.selectedTable);
      this.createNewCustomer();
      //console.log(this.customer);
      this.customerService.createCustomer(this.customer);

      this.router.navigate(['/customer-menu'], { queryParams: {  customerID: this.customer.id } });
    } 
  }

}
