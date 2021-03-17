import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { Ingredient } from 'src/models/Ingredient';
import {IngredientService} from "../../ingredient.service"
import { AddIngredientDialogComponent } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { AddStaffDialogComponent } from '../add-staff-dialog/add-staff-dialog.component';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.sass']
})
export class AddIngredientComponent implements OnInit {

  constructor(private ingredientService: IngredientService,
    public dialog: MatDialog) { }

    ingredients: Ingredient[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  delete(row: Ingredient) {
    this.ingredientService.deleteIngredient(row).subscribe((ing) => {
      this.getAll();
    });
  }

  getAll() {
    this.ingredientService.getIngredients().subscribe((ing) => {
      this.ingredients = ing;
    });
  }

  openAddMenuDialog() {
    const title = "Add New Ingredient";
    let ingredient: Ingredient = new Ingredient();
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      data: {ingredient,title},
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(staff => {
      if(ingredient && ingredient.name && ingredient.quantity){
        console.log(ingredient)
        this.ingredientService.createIngredient(ingredient).subscribe((st) => {
          this.getAll();
        });
      }
    })
  }

  openEditMenuDialog(ingredient:Ingredient): void {
    const title = "Edit Ingredient";
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      data: {ingredient,title},
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(ingredient){
        this.ingredientService.updateIngredient(ingredient).subscribe((st) => {
          this.getAll();
        });
      }
    });

  }

}
