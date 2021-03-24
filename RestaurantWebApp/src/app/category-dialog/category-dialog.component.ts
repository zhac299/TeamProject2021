import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Menu } from "../../models/Menu";
import { MenuCategory } from "../../models/MenuCategory";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.sass']
})

/**
 * The class that handles selcting a menu category.
 */
export class CategoryDialogComponent implements OnInit {

  /**
   * The constructor of the class.
   * 
   * @param dialogRef adialog ref
   * @param data the mat dialog data that gets injected
   */
  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuCategory) { }

  /**
   * A set-up method that gets called once when the class gets instantiated.
   */
  ngOnInit(): void {
  }

  /**
   * Closes the dialog.
   */
  onNoClick() {
    this.dialogRef.close();
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialogRef.close(this.data);
  }
}
