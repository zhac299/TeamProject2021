import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';
import { CustomerInterfaceComponent } from './customer-interface/customer-interface.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { OrderComponent} from './waiter-menu/order/order.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule} from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatChipsModule} from '@angular/material/chips';
import { ExpansionPannelComponent } from './customer-interface/expansion-pannel/expansion-pannel.component';
import { AllergensChipsComponent } from './customer-interface/allergens-chips/allergens-chips.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSliderModule} from '@angular/material/slider';
import { MatTableModule} from "@angular/material/table";
import { MatInputModule} from "@angular/material/input";
import { AddMenuDialogComponent } from './waiter-menu/add-menu-dialog/add-menu-dialog.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { MatCheckboxModule} from "@angular/material/checkbox";
import { BasketComponent } from './customer-interface/basket/basket.component';
import { CallWaiterComponent } from './customer-interface/call-waiter/call-waiter.component';
import { NotificationsComponent } from './waiter-menu/notifications/notifications.component';
import { MatBadgeModule} from '@angular/material/badge';
import { NotificationsDialogComponent } from './waiter-menu/notifications/notifications-dialog/notifications-dialog.component';
import { SelectTableDialogComponent } from './home-page/select-table-dialog/select-table-dialog.component';
import { PickTableDialogComponent } from './waiter-menu/pick-table-dialog/pick-table-dialog.component';
import { ReadyToOrderComponent } from './customer-interface/ready-to-order/ready-to-order.component';
import { MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { KitchenMenuComponent } from './kitchen-menu/kitchen-menu.component';
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import { OrdersListDisplayComponent } from './orders-list-display/orders-list-display.component';
import { ManagerMenuComponent } from './manager-menu/manager-menu.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { OrderTrackerComponent } from './customer-interface/order-tracker/order-tracker.component';
import { MenusListDisplayComponent } from './menus-list-display/menus-list-display.component';
import { AddStaffComponent } from './manager-menu/add-staff/add-staff.component';
import { AddStaffDialogComponent } from './manager-menu/add-staff-dialog/add-staff-dialog.component';
import { TablesListDisplayComponent } from './tables-list-display/tables-list-display.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatRadioModule} from "@angular/material/radio";
import { AddIngredientComponent } from './manager-menu/add-ingredient/add-ingredient.component';
import { AddIngredientDialogComponent } from './manager-menu/add-ingredient-dialog/add-ingredient-dialog.component';
import { PaymentComponent } from './customer-interface/payment/payment.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { IngredientsDialogComponent } from './menus-list-display/ingredients-dialog/ingredients-dialog.component';
import { SalesDialogComponent } from './manager-menu/add-staff/sales-dialog/sales-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WaiterMenuComponent,
    CustomerInterfaceComponent,
    LoginInputComponent,
    HomePageComponent,
    OrderComponent,
    ExpansionPannelComponent,
    AllergensChipsComponent,
    AddMenuDialogComponent,
    BasketComponent,
    CallWaiterComponent,
    NotificationsComponent,
    NotificationsDialogComponent,
    SelectTableDialogComponent,
    PickTableDialogComponent,
    ReadyToOrderComponent,
    KitchenMenuComponent,
    OrdersListDisplayComponent,
    ManagerMenuComponent,
    OrderTrackerComponent,
    MenusListDisplayComponent,
    AddStaffComponent,
    AddStaffDialogComponent,
    TablesListDisplayComponent,
    AddIngredientComponent,
    AddIngredientDialogComponent,
    PaymentComponent,
    CategoryDialogComponent,
    IngredientsDialogComponent,
    SalesDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        CommonModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSliderModule,
        MatTableModule,
        MatCheckboxModule,
        NgOtpInputModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatRadioModule
    ],
  providers: [AllergensChipsComponent, CustomerInterfaceComponent, BasketComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
