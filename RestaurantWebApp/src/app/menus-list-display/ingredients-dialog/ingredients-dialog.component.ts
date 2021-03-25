import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../../models/Menu";

/**
 * Dialog to display menu ingredients
 */
@Component({
  selector: 'app-ingredients-dialog',
  templateUrl: './ingredients-dialog.component.html',
  styleUrls: ['./ingredients-dialog.component.sass']
})
export class IngredientsDialogComponent implements OnInit {

  /**
   *
   * @param dialogRef to open/close dialog
   * @param data menu injected from parent component
   */
  constructor(public dialogRef: MatDialogRef<IngredientsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Menu) { }

  ngOnInit(): void {
  }

}
