import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NotificationsDialogComponent } from './notifications-dialog/notifications-dialog.component';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  numberOfNotifications: number;

  constructor(public dialog: MatDialog) { 
    this.numberOfNotifications = 0;
  }

  ngOnInit(): void {
  }

  public setNumberOfNotifications(newNumberOfNotifications: number) {
    this.numberOfNotifications = newNumberOfNotifications;
  }

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
