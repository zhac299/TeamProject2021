import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInterfaceComponent } from './customer-interface/customer-interface.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OrderComponent } from './waiter-menu/order/order.component';
import { KitchenMenuComponent } from "./kitchen-menu/kitchen-menu.component";
import { ManagerMenuComponent } from "./manager-menu/manager-menu.component";
import { AddStaffComponent } from './manager-menu/add-staff/add-staff.component';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AddIngredientComponent } from './manager-menu/add-ingredient/add-ingredient.component';
import { PaymentComponent } from './customer-interface/payment/payment.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'table/:id', component: OrderComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginInputComponent },
  { path: 'waiter-menu', component: WaiterMenuComponent },
  { path: 'kitchen-menu', component: KitchenMenuComponent },
  { path: 'manager-menu', component: ManagerMenuComponent },
  { path: 'manager-menu/add-staff', component: AddStaffComponent },
  { path: 'manager-menu/add-ingredient', component: AddIngredientComponent },
  { path: 'customer-menu', component: CustomerInterfaceComponent },
  { path: 'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES,
    {
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'disabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
