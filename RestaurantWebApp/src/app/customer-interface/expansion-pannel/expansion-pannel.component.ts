import { Component, OnInit } from '@angular/core';
import { MatExpansionModule} from '@angular/material/expansion';
import { AllergensChipsComponent} from '../allergens-chips/allergens-chips.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CaloriesSliderComponent} from '../calories-slider/calories-slider.component';

@Component({
  selector: 'expansion-pannel',
  templateUrl: './expansion-pannel.component.html',
  styleUrls: ['./expansion-pannel.component.sass']
})
export class ExpansionPannelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
