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
  allergyArray: Boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  allergyString: string = '/';

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
    let filterArgs = this.getAllergens();
    //console.log(this.allergens);
    this.orderListComponent.filter(filterArgs);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.allergens.push(event.option.viewValue);
    this.allergenInput.nativeElement.value = '';
    this.allergensCtrl.setValue(null);
    
    let filterArgs = this.getAllergens();
    //console.log(filterArgs);
    this.orderListComponent.filter(filterArgs);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAllergens.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  
  ngOnInit(): void {
  }

  public getAllergens(): string {
    for(let allergen of this.allergens) {
      if(allergen == 'Peanuts'){
        this.allergyArray[0] = true;
      }
      if(allergen == 'Celery'){
        this.allergyArray[1] = true;
      }
      if(allergen == 'Gluten'){
        this.allergyArray[2] = true;
      }
      if(allergen == 'Crustaceans'){
        this.allergyArray[3] = true;
      }
      if(allergen == 'Eggs'){
        this.allergyArray[4] = true;
      }
      if(allergen == 'Fish'){
        this.allergyArray[5] = true;
      }
      if(allergen == 'Lupin'){
        this.allergyArray[6] = true;
      }
      if(allergen == 'Milk'){
        this.allergyArray[7] = true;
      }
      if(allergen == 'Molluscs'){
        this.allergyArray[8] = true;
      }
      if(allergen == 'Mustard'){
        this.allergyArray[9] = true;
      }
      if(allergen == 'Nuts'){
        this.allergyArray[10] = true;
      }
      if(allergen == 'Soya'){
        this.allergyArray[11] = true;
      }
      if(allergen == 'Sesame Seeds'){
        this.allergyArray[12] = true;
      }
      if(allergen == 'Sulphites'){
        this.allergyArray[13] = true;
      }
    }
    for(let B of this.allergyArray){
      if(B == false){
        this.allergyString = this.allergyString.concat('0/');
      }
      else{
        this.allergyString = this.allergyString.concat('1/');
      }
    }
    //console.log(this.allergens);

    let temp:string = this.allergyString;
    this.allergyString = '/';
    return temp;
  }
}