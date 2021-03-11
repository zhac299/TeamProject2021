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
  hideMatBadge: boolean;

  constructor(public dialog: MatDialog) { 
    this.numberOfNotifications = 0;
    this.hideMatBadge = true;
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
