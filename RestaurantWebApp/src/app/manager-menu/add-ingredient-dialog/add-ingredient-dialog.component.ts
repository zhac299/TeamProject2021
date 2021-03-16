import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Ingredient } from 'src/models/Ingredient';

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.sass']
})
export class AddIngredientDialogComponent implements OnInit {

  selected = -1;
  constructor(public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { ingredient:Ingredient,title:string }) { }

  ngOnInit(): void {}

  setCalories(value: number) {
    return value;
  }

  onNoClick(): void {
    console.log(this.data.ingredient);
    this.dialogRef.close();
  }

  setData(ingredient:Ingredient) {
    this.data.ingredient = ingredient;
  }

}
            
