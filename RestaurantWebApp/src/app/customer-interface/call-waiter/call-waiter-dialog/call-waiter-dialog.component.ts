import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'call-waiter-dialog',
  templateUrl: './call-waiter-dialog.component.html',
  styleUrls: ['./call-waiter-dialog.component.sass']
})
export class CallWaiterDialogComponent implements OnInit {

  tables: string[] = ["Table1", "Table2", "Table3", "Table4", "Table 5", "Table 6", "Table 7"];
  selectedTable: string;

  constructor() { }
  ngOnInit(): void {}

  callWaiter(): void {
    console.log(this.selectedTable); 
  }
}
