import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.reviewOrderGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.paymentGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
