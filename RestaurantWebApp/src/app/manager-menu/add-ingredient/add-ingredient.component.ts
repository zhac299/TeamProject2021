import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Ingredient } from '../../../models/Ingredient';
import { IngredientService } from "../../ingredient.service"
import { AddIngredientDialogComponent } from '../add-ingredient-dialog/add-ingredient-dialog.component';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.sass']
})

/**
 * The class that handles the stock page.
 */
export class AddIngredientComponent implements OnInit {

  /**
   * The constructor of the class.
   * 
   * @param ingredientService the ingredient service that is used to make requests
   * @param dialog a mat dialog
   */
  constructor(private ingredientService: IngredientService,
    public dialog: MatDialog) { }

  /**
   * The ingredients list from the DB.
   */
  ingredients: Ingredient[] = [];

  /**
   * A set-up method that gets called once when the class gets instantiated.
   * Gets all the ingredients from the DB.= by calling getAll().
   */
  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Deletes an ingredient.
   * Makes a delete request to the Ingredient DB by subscribing to deleteIngredient().
   * 
   * @param row the ingredient to be deleted
   */
  delete(row: Ingredient) {
    this.ingredientService.deleteIngredient(row).subscribe((ing) => {
      this.getAll();
    });
  }

  /**
   * Gets all the ingtdient in the DB by making a get requst to th DB.
   */
  getAll() {
    this.ingredientService.getIngredients().subscribe((ing) => {
      this.ingredients = ing;
    });
  }

  /**
   * Opens the add ingredient dialog. Injects in the dialog a new ingredient object 
   * and title. After the dialog is closed, it creates a new ingredient with the provided data.
   */
  openAddIngredientDialog() {
    const title = "Add New Ingredient";
    let ingredient: Ingredient = new Ingredient();
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      data: { ingredient, title },
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(staff => {
      if (ingredient && ingredient.name && ingredient.quantity) {
        this.ingredientService.createIngredient(ingredient).subscribe((st) => {
          this.getAll();
        });
      }
    })
  }

  /**
   * Opens the edit ingredient dialog. 
   * After closing the dialog, it makes a put request to update the ingredient
   * with the provided data by the dialog.
   * 
   * @param ingredient the ingredient to be edited
   */
   openEditIngredientDialog(ingredient: Ingredient): void {
    const title = "Edit Ingredient";
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      data: { ingredient, title },
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (ingredient) {
        this.ingredientService.updateIngredient(ingredient).subscribe((st) => {
          this.getAll();
        });
      }
    });

  }

}
