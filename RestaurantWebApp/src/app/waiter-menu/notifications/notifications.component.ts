import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../table.service';
import { NotificationsDialogComponent } from './notifications-dialog/notifications-dialog.component';

/**
 * Notifications button component to show which tables need assistance or are ready to order.
 * Tables can then also be dismissed if helped.
 */
@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  /**
   * Number to display how many notifications exist
   */
  numberOfNotifications: number;

  /**
   * Whether the badge should be hidden or not
   */
  hideMatBadge: boolean;

  /**
   *
   * @param dialog to open/close dialogs
   * @param tableService to perform crud for tables
   */
  constructor(
    public dialog: MatDialog,
    private tableService: TableService) {
    this.numberOfNotifications = 0;
    this.hideMatBadge = true;
  }

  /**
   * Gets all tables that need help
   */
  ngOnInit(): void {
    this.tableService.getNeedHelpTables().subscribe((tables) => {
      this.numberOfNotifications = tables.length;
    })
  }

  /**
   * Opens the Notification dialog component once clicked on
   */
  openDialog() {
    const dialogRef = this.dialog.open(NotificationsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
