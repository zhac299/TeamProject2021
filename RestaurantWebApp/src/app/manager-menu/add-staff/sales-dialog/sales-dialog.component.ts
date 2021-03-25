import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Staff} from "../../../../models/Staff";

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.sass']
})
export class SalesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SalesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Staff
              ) { }

  ngOnInit(): void {
  }

}
