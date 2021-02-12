import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './order-list/order-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InitialMenuComponent } from './initial-menu/initial-menu.component';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';
import { CustomerInterfaceComponent } from './customer-interface/customer-interface.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {OrderComponent} from './waiter-menu/order/order.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MenuFilterComponent } from './menu-filter/menu-filter.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { ExpansionPannelComponent } from './customer-interface/expansion-pannel/expansion-pannel.component';
import { AllergensChipsComponent } from './customer-interface/allergens-chips/allergens-chips.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CaloriesSliderComponent } from './customer-interface/calories-slider/calories-slider.component';
import {MatSliderModule} from '@angular/material/slider';
import { FoodCategoriesComponent } from './customer-interface/food-categories/food-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    InitialMenuComponent,
    WaiterMenuComponent,
    CustomerInterfaceComponent,
    LoginInputComponent,
    HomePageComponent,
    OrderComponent,
    MenuFilterComponent,
    ExpansionPannelComponent,
    AllergensChipsComponent,
    CaloriesSliderComponent,
    FoodCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
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
    MatSliderModule
  ],
  providers: [AllergensChipsComponent, OrderListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
