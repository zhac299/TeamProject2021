import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from 'src/app/table.service';
import { Table } from 'src/models/Table';

@Component({
  selector: 'select-table-dialog',
  templateUrl: './select-table-dialog.component.html',
  styleUrls: ['./select-table-dialog.component.sass']
})
export class SelectTableDialogComponent implements OnInit {

  tables: Table[] = [];
  selectedTable: Table;
  
  constructor(private router:Router, private tableService: TableService) { }

  ngOnInit(): void {
    this.tableService.getUnoccupiedTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  forCustomer(): void { 
    this.router.navigateByUrl('customer-menu');   
  }

}
