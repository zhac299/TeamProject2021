import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule} from '@angular/material/expansion';
import { Meal } from 'src/models/Meal';
import { BasketComponent } from '../basket.component';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/models/Order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

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
  orders: Order[];
  interacted: Boolean = true;
  correctInputs: Boolean = true;
  needToReview: Boolean = false;
  wrongDetails: Boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder, 
    private basketComponent: BasketComponent,
    private orderService: OrderService) {}

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
      if(this.paymentGroup.get('expDateControl').value.length == 5 
      || this.paymentGroup.get('expDateControl').value.length == 7){
        let trueDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
        let trueDateString = trueDate.split("/", 2);
        let date = this.paymentGroup.get('expDateControl').value.split("/", 2);
        let temp = trueDate.split("");
        let century = temp[0] + temp[1]
        if(date[1].length == 2){
          date[1] = century + date[1];
        }
        if((parseInt(date[0]) < 13 && parseInt(date[1]) > parseInt(trueDateString[0])) 
        || (parseInt(date[0]) < 13 && parseInt(date[0]) > parseInt(trueDateString[1])-1 && parseInt(date[1]) == parseInt(trueDateString[0]))){
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

  pay(): void {
    this.basketComponent.customer.subscribe((customer) => {
      this.orders = customer.orders;
      if(!this.interacted){
        this.needToReview = false;
        if(!this.correctInputs){
          this.wrongDetails = false;
          for (let order of customer.orders) {
            order.isPaid = true;
            this.orderService.updateIsPaid(order);
          }
        } else {
          this.wrongDetails = true;
        }
      } else {
        this.needToReview = true;
      }
    });

    this.openSnackBar("Your payment is confirmed","Muchas Gracias!")
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
