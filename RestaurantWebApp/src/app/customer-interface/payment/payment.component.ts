import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Meal } from '../../../models/Meal';
import { CustomerService } from '../../customer.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'payment-stepper',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})

/**
 * The class that handles the payment of an order.
 */
export class PaymentComponent implements OnInit {

  /**
   * The reviewOrder group inside the stepper.
   */
  reviewOrderGroup: FormGroup;
  
  /**
   * The paymentGroup inside the stepper.
   */
  paymentGroup: FormGroup;

  /**
   * The meal list of the order.
   */
  mealList: Meal[];

  /**
   * Defines the stepper peoperty interacted.
   */
  interacted: Boolean;

  /**
   * Var that asserts if the inputs are correct.
   */
  correctInputs: Boolean;

  /**
   * Var that asserts if the user needs to review his order.
   */
  needToReview: Boolean;

  /**
   * Var that asserts if the card details are wrong.
   */
  wrongDetails: Boolean;

  /**
   * Var that asserts if the order is paid or not.
   */
  isPaid: Boolean;

  /**
   * Var that asserts if the order is confirmed or not.
   */
  isConfirmed: Boolean;
  
  /**
   * The activated route params object.
   */
  paramsObject: any;

  /**
   * The constructor of the class.
   * Sets the default value of the stepper params as false.
   * 
   * @param router a router to route back to the customer menu
   * @param snackBar a snack bar
   * @param _formBuilder the form builder for the card details
   * @param customerService the customer service that handles get requests
   * @param orderService the order service tha that is used to make get and post requests
   * @param route the activate route from the customer menu
   */
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private route: ActivatedRoute,) { 
      this.interacted = false;
      this.correctInputs = false;
      this.needToReview = false;
      this.wrongDetails = false;
      this.isPaid = false;
      this.isConfirmed = false;
    }

  /**
   * Set-up method that gets called once when the class is instantiated.
   * Defines the form builder for the review order and the form builder 
   * for the payment group of the stepper.
   * Subscribes to the activated route's params observable and instantiates the paramsObject.
   * It susbcribes to the customer service refresh needed Subject to handle incoming DB changes
   * to the order (refreshes only it detects a change has been done to the DB) and calls updateMealList()
   */
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
    this.customerService.refreshNeeded.subscribe(() => {
      this.updateMealList();
    })
    this.updateMealList();
  }

  /**
   * Updates the meal list of the order.
   * It subscribes to getOrderById() that returns an Order Observable. Inside the 
   * subscription, it updates the meal list and sets isPaid and isConfirmed to true.
   */
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

  /**
   * Sets interacted to false.
   */
  orderReviewed(): void {
    this.interacted = false;
  }

  /**
   * Checks if the card input is correct. Checks if the card number and
   * CVC code are of the right format and if the date provided is one from
   * the future and update the class vars accordingly.
   */
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

  /**
   * Pays for the order. 
   * If the card input is corrct, it makes a get request to get the order from the DB, by 
   * subscribing to getOrderById() that returns an Order observable. Inside the subscription,
   * it makes a put reqest to update order isPaid to true by calling the order service
   * updateIsPaid method. It updates all the class vars accordingly.
   */
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

  /**
   * Navigates back to the customer menu with an activated route
   * with the customer id and selectedTable params.
   */
  navigateToMenu(): void {
    this.router.navigate(['/customer-menu'],
      {
        queryParams: {
          customerId: this.paramsObject.params.customerId,
          selectedTable: this.paramsObject.params.tableNumber
        }
      });
  }

  /**
   * Opens a snack bar that informs the user the order was paid.
   * 
   * @param message the message of the snack bar
   * @param action the action of the snack bar
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
