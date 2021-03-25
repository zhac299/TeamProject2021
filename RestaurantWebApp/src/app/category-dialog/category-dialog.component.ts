import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../models/Menu";
import {MenuCategory} from "../../models/MenuCategory";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.sass']
})
export class CategoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MenuCategory) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close(this.data);
  }
}
