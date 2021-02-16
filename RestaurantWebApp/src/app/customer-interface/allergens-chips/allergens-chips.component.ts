import {OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {CustomerInterfaceComponent} from "../customer-interface.component";
@Component({
  selector: 'allergens-chips',
  templateUrl: './allergens-chips.component.html',
  styleUrls: ['./allergens-chips.component.sass']
})
export class AllergensChipsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allergensCtrl = new FormControl();
  filteredAllergens: Observable<string[]>;
  allergens: string[] = ['Celery'];
  allAllergens: string[] = ['Peanuts', 'Celery', 'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk', 'Molluscs', 'Mustard', 'Nuts', 'Soya', 'Sesame Seeds', 'Sulphites'];

  @ViewChild('allergenInput') allergenInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

   constructor(
     private customerInterfaceComponent: CustomerInterfaceComponent
   ) {
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

  public getAllergens(): string {
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

  formatLabel(value: number) {
    return value;
  }

  filterByAllergens(): void {
     this.customerInterfaceComponent.filter(this.getAllergens());
  }
}
