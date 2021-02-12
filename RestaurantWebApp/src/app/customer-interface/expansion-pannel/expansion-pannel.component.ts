import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OrderListComponent } from 'src/app/order-list/order-list.component';
import { OrderListService } from 'src/app/order-list/order-list.service';
import { AllergensChipsComponent} from '../allergens-chips/allergens-chips.component';

@Component({
  selector: 'expansion-pannel',
  templateUrl: './expansion-pannel.component.html',
  styleUrls: ['./expansion-pannel.component.sass']
})
export class ExpansionPannelComponent implements OnInit {

  constructor(
    private chips: AllergensChipsComponent,
    private orderListComponent: OrderListComponent,
    private orderListService: OrderListService
    ) { }
  ngOnInit(): void {
 
  }
}
