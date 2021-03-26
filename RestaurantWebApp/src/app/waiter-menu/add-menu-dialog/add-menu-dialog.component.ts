import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../../models/Menu";
import { MatSliderChange } from '@angular/material/slider';
import {MenuCategory} from "../../../models/MenuCategory";
import {MenuCategoryService} from "../../menu-category.service";
import {map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import { Ingredient } from '../../../models/Ingredient';
import { IngredientService } from '../../ingredient.service';

/**
 * Dialog component for a Menu item that allows you to inject a Menu and configure
 * it's values.
 */
@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.sass']
})
export class AddMenuDialogComponent implements OnInit {

  /**
   * Menu Categories
   */
  categories: MenuCategory[];

  /**
   * A subject that changes based on which category is selected
   */
  selectedCategory: BehaviorSubject<MenuCategory> = new BehaviorSubject<MenuCategory>(this.data.menu.category);

  /**
   * All ingredients present in the database
   */
  ingredients: Ingredient[] = [];

  /**
   * Suggested price range for a menu item with certain ingredients
   */
  suggestedPriceRange: number[];

  /**
   *
   * @param dialogRef to open/close dialogs
   * @param ingredientService to perform crud for ingredients
   * @param menuCategoryServiceto perform crud for menu categories
   * @param data injected data {Menu, Title, hasMenuItem} from parent component
   */
  constructor(public dialogRef: MatDialogRef<AddMenuDialogComponent>,
              private ingredientService: IngredientService,
              private menuCategoryService: MenuCategoryService,
              @Inject(MAT_DIALOG_DATA) public data: { menu:Menu,title:string,hasMenuItem:boolean }) { }

  /**
   * Gets ingredients, categories and sets suggested price range
   */
  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe((ing) => {
      this.ingredients = ing;
    });
    this.menuCategoryService.getMenuCategories()
      .subscribe((menuCategories) => {
      this.categories = menuCategories;
    })
    this.suggestedPriceRange = [];
    this.suggestedPriceRange[0] = 0;
    this.suggestedPriceRange[1] = 0;
  }

  /**
   * Sets the calories value of the current menu item
   * @param value
   */
  setCalories(value: number) {
    return value;
  }

  /**
   * Closes dialog without changing anything
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Sets the injected menu to
   * @param new menu to set as current menu
   */
  setData(menu:Menu) {
    this.data.menu = menu;
  }

  /**
   * Changes calories on a Mat Slider event
   * @param event the slider event that changes the number of calories
   */
  onCaloriesChange(event: MatSliderChange) {
    this.data.menu.calories = event.value;
  }

  /**
   * Changes category of the current menu
   * @param category to change to
   */
  changeCategory(category: MenuCategory) {
    this.selectedCategory.next(category);
  }

  /**
   * Finds the selected category to assign a check value to a category checkbox
   * @param category to check is selected or not
   * @return true if a category is selected, false if it is not selected
   */
  isSelectedCat(category: MenuCategory){
    let isSelectedCat;
    this.selectedCategory.pipe(
      map((sc) => sc.id == category.id)
    ).subscribe((isCat) => isSelectedCat = isCat);
    return isSelectedCat;
  }

  /**
   * Closes the dialog and returns the changed/unchanged
   * menu back to the parent component
   */
  closeDialog(): void {
    this.selectedCategory.subscribe((sc) => this.data.menu.category = sc);
    this.dialogRef.close(this.data.menu);
  }

  /**
   * Updates the price range by summing costs of ingredients and
   * adding a profit margin of 60%
   */
  updateSuggestedPriceRange(): void {
    console.log(this.data);
    if (this.data.hasMenuItem == undefined) {
      let total:number = 0;
      this.data.menu.ingredients.forEach((selectedIngredient) => {
        this.ingredients.forEach((ingredient) => {
          if (ingredient.id == selectedIngredient.id) {
            total += ingredient.pricePerItem;
          }
        })
      })
      this.suggestedPriceRange[0] = total + 0.6 * total;
      this.suggestedPriceRange[1] = total + 1 * total;
    }
  }
}
