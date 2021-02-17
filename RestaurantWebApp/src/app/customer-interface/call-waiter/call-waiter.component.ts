import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'call-waiter',
  templateUrl: './call-waiter.component.html',
  styleUrls: ['./call-waiter.component.sass']
})
export class CallWaiterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}
}
@Component({
  selector: 'call-waiter-dialog',
  templateUrl: 'call-waiter-dialog.html',
})
export class CallWaiterDialog{}
