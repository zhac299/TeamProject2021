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
 * Constructor tasked with instantiating the services and dialog neccessary for adding ingredients.
 * 
 * @param {IngredientService} ingredientService The service tasked with making changes the database according to user interaction.
 * @param {MatDialog} dialog An object involved with creating pop-up panels for more user interaction.
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
   * This method is purposed with deleting an ingredient on the database upon a button press.
   * 
   * @param {Ingredient} row The particular ingredient which needs deleting.
   */
  delete(row: Ingredient) {
    this.ingredientService.deleteIngredient(row).subscribe((ing) => {
      this.getAll();
    });
  }

    /**
     * Method for populating a list of ingredients.
     */
  getAll() {
    this.ingredientService.getIngredients().subscribe((ing) => {
      this.ingredients = ing;
    });
  }
/**
 * This method is purposed with opening a pop-up display so a manger can add new ingredients.
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
 * This method is purposed with giving the manager the ability to edit ingredients.
 * 
 * @param {Ingredient} ingredient The ingredient subjected to modification.
 */
  openEditMenuDialog(ingredient: Ingredient): void {
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
