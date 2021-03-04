import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
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
  correctInputs: Boolean = true;

  constructor(
    private _formBuilder: FormBuilder, 
    private basketComponent: BasketComponent) {}

  ngOnInit() {
    this.reviewOrderGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.paymentGroup = this._formBuilder.group({
      cardNumberControl: ['', Validators.required],
      expDateControl: ['', Validators.required],
      cvvCodeControl: ['', Validators.required]
    });
    this.mealList = this.basketComponent.getMealList();
  }

  orderReviewed(): void{
    this.interacted = false;
  }

  checkCardInput(): void{
    console.log(this.paymentGroup.get('cardNumberControl').value);
    if(this.paymentGroup.get('cardNumberControl').value.length == 19 
    || this.paymentGroup.get('cardNumberControl').value.length == 16){
      if(this.paymentGroup.get('expDateControl').value.length == 5){
        let date = this.paymentGroup.get('expDateControl').value.split("/", 2);
        console.log(date);
        console.log(parseInt(date[0]));
        if((parseInt(date[0]) < 13 && parseInt(date[1]) > 21) || (parseInt(date[0]) < 13 && parseInt(date[0]) > 3 && parseInt(date[1]) == 21)){
          if(this.paymentGroup.get('cvvCodeControl').value.length == 3){
           this.correctInputs = false;
          } else {
           this.correctInputs = true;
          }
        } else {
          this.correctInputs = true;
        }
      } else {
        this.correctInputs = true;
      }
    } else {
      this.correctInputs = true;
    }
    console.log(this.correctInputs);
  }
}
