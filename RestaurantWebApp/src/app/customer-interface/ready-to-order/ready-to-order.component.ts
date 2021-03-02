import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/table.service';
import { Table } from 'src/models/Table';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'ready-to-order',
  templateUrl: './ready-to-order.component.html',
  styleUrls: ['./ready-to-order.component.sass']
})
export class ReadyToOrderComponent implements OnInit {

  ready: boolean = false;
  tables: Table[] = [];

  constructor(private customerInterface: CustomerInterfaceComponent, 
    private tableService: TableService) { }

  ngOnInit(): void {}

  readyToOrder(): void {
    this.customerInterface.table.subscribe((table) => {
      table.isReady = true;
      this.tableService.updateTable(table).subscribe();
    });
    this.ready = true;
  }

  cancel(): void {
    this.customerInterface.table.subscribe((table) => {
      table.isReady = false;
      this.tableService.updateTable(table).subscribe();
    });
    this.ready = false;
  }

}
