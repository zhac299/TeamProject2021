import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { Meal } from '../../../models/Meal';
import { BasketComponent } from '../basket/basket.component';
import { CustomerService } from '../../customer.service';
import { OrderService } from '../../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'payment-stepper',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class PaymentComponent implements OnInit {

  reviewOrderGroup: FormGroup;
  paymentGroup: FormGroup;
  mealList: Meal[];
  interacted: Boolean = true;
  correctInputs: Boolean = true;
  needToReview: Boolean = false;
  wrongDetails: Boolean = false;
  isPaid: Boolean = false;
  isConfirmed: Boolean = false;
  paramsObject:any;

  constructor(
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.reviewOrderGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.paymentGroup = this._formBuilder.group({
      cardNumberControl: ['', Validators.required],
      expDateControl: ['', Validators.required],
      cvvCodeControl: ['', Validators.required]
    });

    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
    });
    // this.customerService.refreshNeeded.subscribe(() => {
    //   this.updateMealList();
    // })
    this.updateMealList();
  }

  updateMealList(): void {
    this.orderService.getOrderById(this.paramsObject.params.orderId).subscribe((order) => {
      if (order.isPaid == true) {
        this.isPaid = true;
      }
      if (order.isConfirmed == true) {
        this.isConfirmed = true;
      }
      this.mealList = order.meal;
    })
  }

  orderReviewed(): void {
    this.interacted = false;
  }

  checkCardInput(): void {
    if (this.paymentGroup.get('cardNumberControl').value.length == 19) {
      if (this.paymentGroup.get('expDateControl').value.length == 5
        || this.paymentGroup.get('expDateControl').value.length == 7) {
        let trueDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
        let trueDateString = trueDate.split("/", 2);
        let date = this.paymentGroup.get('expDateControl').value.split("/", 2);
        let temp = trueDate.split("");
        let century = temp[0] + temp[1]
        if (date[1].length == 2) {
          date[1] = century + date[1];
        }
        if ((parseInt(date[0]) < 13 && parseInt(date[1]) > parseInt(trueDateString[0]))
          || (parseInt(date[0]) < 13 && parseInt(date[0]) > parseInt(trueDateString[1]) - 1 && parseInt(date[1]) == parseInt(trueDateString[0]))) {
          if (this.paymentGroup.get('cvvCodeControl').value.length == 3) {
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
  }

  pay(): void {
    if (!this.interacted) {
      this.needToReview = false;
      if (!this.correctInputs) {
        this.wrongDetails = false;
        this.orderService.getOrderById(this.paramsObject.params.orderId).subscribe((order) => {
          order.isPaid = true;
          this.orderService.updateIsPaid(order);
        })
      } else {
        this.wrongDetails = true;
      }
    } else {
      this.needToReview = true;
    }
    this.isPaid = true;
    this.openSnackBar("Your payment is confirmed", "Muchas Gracias!")
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
