import { Component, OnInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'calories-slider',
  templateUrl: './calories-slider.component.html',
  styleUrls: ['./calories-slider.component.sass']
})
export class CaloriesSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return value;
  }

}
