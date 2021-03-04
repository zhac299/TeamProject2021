import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule} from '@angular/material/expansion';
import { Meal } from 'src/models/Meal';
import { BasketComponent } from '../basket.component';

@Component({
  selector: 'payment-stepper',
  templateUrl: './payment-stepper.component.html',
  styleUrls: ['./payment-stepper.component.sass'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class PaymentStepperComponent implements OnInit {

  reviewOrderGroup: FormGroup;
  paymentGroup: FormGroup;
  mealList: Meal[];
  interacted: Boolean = true;

  constructor(
    private _formBuilder: FormBuilder, 
    private basketComponent: BasketComponent) {}

  ngOnInit() {
    this.reviewOrderGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.paymentGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.mealList = this.basketComponent.getMealList();
  }

  orderReviewed() {
    this.interacted = false;
  }
}
