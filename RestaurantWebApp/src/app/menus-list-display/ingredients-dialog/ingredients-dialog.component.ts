import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../../models/Menu";

@Component({
  selector: 'app-ingredients-dialog',
  templateUrl: './ingredients-dialog.component.html',
  styleUrls: ['./ingredients-dialog.component.sass']
})
export class IngredientsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IngredientsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Menu) { }

  ngOnInit(): void {
  }

}
