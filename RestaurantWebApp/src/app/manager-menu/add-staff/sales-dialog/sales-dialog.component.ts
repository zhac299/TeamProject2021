import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Staff} from "../../../../models/Staff";

/**
 * Dialog that shows sales information for a staff member
 */
@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.sass']
})
export class SalesDialogComponent implements OnInit {

  /**
   *
   * @param dialogRef to close dialog
   * @param staff data injected from parent component
   */
  constructor(public dialogRef: MatDialogRef<SalesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Staff
              ) { }

  ngOnInit(): void {
  }

}
