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
   * The selected calories.
   */
  calories: number = 0;

  @ViewChild('allergenInput') allergenInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  /**
   * The constructor of the class.
   * 
   * @param customerInterfaceComponent a customer interface instance used in the class
   */
  constructor(
    private customerInterfaceComponent: CustomerInterfaceComponent) {
    this.filteredAllergens = this.allergensCtrl.valueChanges.pipe(
      startWith(null),
      map((allergen: string | null) => allergen ? this._filter(allergen) : this.allAllergens.slice()));
  }

  /**
   * Set up method that gets called once when the object gets instantiated.
   */
  ngOnInit(): void {
  }

  /**
   * Adds an allergen to the allergens list when a MatChipInput happens.
   * 
   * @param event the emitter event
   */
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

  /**
   * Removes an allergen from the selected list.
   * 
   * @param allergen the allergen to be removed
   */
  remove(allergen: string): void {
    const index = this.allergens.indexOf(allergen);

    if (index >= 0) {
      this.allergens.splice(index, 1);
    }
  }

  /**
   * Adds the value of a MatAutoCompleted event and updates the value
   * of the form controller.
   * 
   * @param event the emmiter event
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.allergens.push(event.option.viewValue);
    this.allergenInput.nativeElement.value = '';
    this.allergensCtrl.setValue(null);
  }

  /**
   * Converts the param to lower case.
   * Filters the intial drop down list in alphabetical order.
   * 
   * @param value the value to be added to the filtered 
   * @returns the list of allergen in aplhabetical order
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAllergens.filter(allergen => allergen.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Forms from the selected allergens list a string with a boolean/
   * format that will be used by the get request to filter the DB.
   * 
   * @returns a formatted string to be used by Api to filter the DB
   */
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

  /**
   * Sets a new value to the calories slider
   * 
   * @param value the new value of the slider
   * @returns the value of slider
   */
  setCalories(value: number) {
    return value;
  }

  /**
   * Sets the class field to the value of emitter event.
   * 
   * @param event the emmiter event
   */
  onInputChange(event: MatSliderChange) {
    this.calories = event.value;
  }

  /**
   * Forms the string that will be used by the Menu Filter Service 
   * to make the get request to the DB.
   * 
   * @returns a formatted string to be used by Api to filter the DB
   */
  getAllergensAndCalories(): string {
    let result: string = '';
    result = result.concat(this.getAllergens());
    result = result.concat(String(this.calories));
    return result;
  }

  /**
   * Calls the Customer Interface Method to filter by allergens and calories.
   */
  filterByAllergensAndCalories(): void {
    this.customerInterfaceComponent.filter(this.getAllergensAndCalories());
  }

  /**
   * Resets all the filters.
   */
  reset(): void {
    this.customerInterfaceComponent.findCategoryItems();
  }
}
