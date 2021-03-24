import { OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { CustomerInterfaceComponent } from "../customer-interface.component";
import { MatSliderChange } from '@angular/material/slider';
@Component({
  selector: 'allergens-chips',
  templateUrl: './allergens-chips.component.html',
  styleUrls: ['./allergens-chips.component.sass']
})
/**
 * The class that handles the selection of the allergens
 * and calories when filtering the menu.
 */
export class AllergensChipsComponent implements OnInit {

  /**
   * Defines the allergen mat chip as selectable.
   */
  selectable = true;

  /**
   * Defines the allergen mat chip as removable.
   */
  removable = true;

  /**
   * Defines the list of the key codes that sepparate the chips.
   */
  separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * The form controller.
   */
  allergensCtrl = new FormControl();

  /**
   * An async observable that gets the list of allergens filtered alphabetically.
   */
  filteredAllergens: Observable<string[]>;

  /**
   * The list of selected allergens.
   */
  allergens: string[] = ['Celery'];

  /**
   * The list of all the available allergens.
   */
  allAllergens: string[] = ['Peanuts', 'Celery', 'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk', 'Molluscs', 'Mustard', 'Nuts', 'Soya', 'Sesame Seeds', 'Sulphites'];
  
  /**
   * The list of selected calories.
   */
  calories: number = 0;

  @ViewChild('allergenInput') allergenInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private customerInterfaceComponent: CustomerInterfaceComponent) {
    this.filteredAllergens = this.allergensCtrl.valueChanges.pipe(
      startWith(null),
      map((allergen: string | null) => allergen ? this._filter(allergen) : this.allAllergens.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.allergens.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.allergensCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.allergens.indexOf(fruit);

    if (index >= 0) {
      this.allergens.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.allergens.push(event.option.viewValue);
    this.allergenInput.nativeElement.value = '';
    this.allergensCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAllergens.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  }

  getAllergens(): string {
    let result: string = "/";
    for (let allergen of this.allAllergens) {
      if (this.allergens.includes(allergen)) {
        result = result.concat("1/");
      } else {
        result = result.concat("0/");
      }
    }
    return result;
  }

  setCalories(value: number) {
    return value;
  }

  onInputChange(event: MatSliderChange) {
    this.calories = event.value;
  }

  getAllergensAndCalories(): string {
    let result: string = '';
    result = result.concat(this.getAllergens());
    result = result.concat(String(this.calories));
    return result;
  }

  filterByAllergensAndCalories(): void {
    this.customerInterfaceComponent.filter(this.getAllergensAndCalories());
  }

  reset(): void {
    this.customerInterfaceComponent.findCategoryItems();
  }
}
