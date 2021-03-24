import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Ingredient } from '../../../models/Ingredient';

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.sass']
})

/**
 * The class that handles adding an ingredient dialog.
 */
export class AddIngredientDialogComponent implements OnInit {

  /**
   * The constructor of the class.
   * Injects the mat dialog dat into ingredient and title.
   * 
   * @param dialogRef the dialog ref
   * @param data the injected data
   */
  constructor(public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingredient: Ingredient, title: string }) { }

  /**
   * A set-up method that gets called once when the class gets instantiated.
   */
  ngOnInit(): void { }

  /**
   * Sets calories to the calories slider.
   * 
   * @param value the new value of calories slider
   * @returns the new value of calories slider
   */
  setCalories(value: number) {
    return value;
  }

  /**
   * Closes the dialog.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Sets the mat dialog data.
   * 
   * @param ingredient the new ingredient to be added to data
   */
  setData(ingredient: Ingredient) {
    this.data.ingredient = ingredient;
  }

}

