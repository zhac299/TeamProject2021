import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'call-waiter-dialog',
  templateUrl: './call-waiter-dialog.component.html',
  styleUrls: ['./call-waiter-dialog.component.sass']
})
export class CallWaiterDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  value = 'Clear me';
}
