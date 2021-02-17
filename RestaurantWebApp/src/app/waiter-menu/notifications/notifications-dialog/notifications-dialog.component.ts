import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.sass']
})
export class NotificationsDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tables: string[] = ['Table1', 'Table2', 'Table3', 'Table4', 'Table5'];

}
