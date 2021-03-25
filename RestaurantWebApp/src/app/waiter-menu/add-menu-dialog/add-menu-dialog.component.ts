import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../../models/Menu";
import { MatSliderChange } from '@angular/material/slider';
import {MenuCategory} from "../../../models/MenuCategory";
import {MenuCategoryService} from "../../menu-category.service";
import {map, min, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import { Ingredient } from '../../../models/Ingredient';
import { IngredientService } from '../../ingredient.service';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.sass']
})
export class AddMenuDialogComponent implements OnInit {
  categories: MenuCategory[];
  selectedCategory: BehaviorSubject<MenuCategory> = new BehaviorSubject<MenuCategory>(this.data.menu.category);
  ingredients: Ingredient[] = [];
  suggestedPriceRange: number[];

  constructor(public dialogRef: MatDialogRef<AddMenuDialogComponent>,
              private ingredientService: IngredientService,
              private menuCategoryService: MenuCategoryService,
              @Inject(MAT_DIALOG_DATA) public data: { menu:Menu,title:string,hasMenuItem:boolean }) { }

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

  setCalories(value: number) {
    return value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setData(menu:Menu) {
    this.data.menu = menu;
  }

  onCaloriesChange(event: MatSliderChange) {
    this.data.menu.calories = event.value;
  }

  changeCategory(category: MenuCategory) {
    this.selectedCategory.next(category);
  }

  isSelectedCat(category: MenuCategory){
    let isSelectedCat;
    this.selectedCategory.pipe(
      map((sc) => sc.id == category.id)
    ).subscribe((isCat) => isSelectedCat = isCat);
    return isSelectedCat;
  }

  closeDialog(): void {
    this.selectedCategory.subscribe((sc) => this.data.menu.category = sc);
    this.dialogRef.close(this.data.menu);
  }

  updateSuggestedPriceRange(): void {
    console.log(this.data);
    if (this.data.hasMenuItem == undefined) {
      let total:number = 0;
      this.data.menu.ingredients.forEach((selectedIngredient) => {
        let includesIngredient: boolean = false;
        this.ingredients.forEach((ingredient) => {
          // @ts-ignore
          if (ingredient.id == selectedIngredient) {
            includesIngredient = false;
            total += ingredient.pricePerItem;
          }
        })
      })
      this.suggestedPriceRange[0] = total + 0.6 * total;
      this.suggestedPriceRange[1] = total + 1 * total;
    }
  }
}
