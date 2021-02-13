import {OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { OrderListComponent } from 'src/app/order-list/order-list.component';
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
  allergens: string[] = [];
  allAllergens: string[] = ['Celery', 'Peanuts', 'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk', 'Molluscs', 'Mustard', 'Nuts', 'Soya', 'Sesame Seeds', 'Sulphites'];

  @ViewChild('allergenInput') allergenInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

   constructor(
     private orderListComponent: OrderListComponent
   ) {
    this.filteredAllergens = this.allergensCtrl.valueChanges.pipe(
        startWith(null),
        map((allergen: string | null) => allergen ? this._filter(allergen) : this.allAllergens.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our allergens
    if ((value || '').trim()) {
      this.allergens.push(value.trim());
    }
    // Reset the input value
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
    //console.log(this.allergens);
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

  filter(): void {
    let filterArgs = this.getAllergens();
    //console.log(filterArgs);
    this.orderListComponent.filter(filterArgs)
    this.orderListComponent.filterArgs = filterArgs;
  }

}
