import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInterfaceComponent } from './customer-interface/customer-interface.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OrderComponent } from './waiter-menu/order/order.component';
import { MenuFilterComponent } from './menu-filter/menu-filter.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import {KitchenMenuComponent} from "./kitchen-menu/kitchen-menu.component";
import {ManagerMenuComponent} from "./manager-menu/manager-menu.component";
import { AddStaffComponent } from './manager-menu/add-staff/add-staff.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'table/:id', component: OrderComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginInputComponent },
  { path: 'waiter-menu', component: WaiterMenuComponent },
  { path: 'kitchen-menu', component: KitchenMenuComponent },
  { path: 'manager-menu', component: ManagerMenuComponent },
  { path: 'manager-menu/add-staff', component: AddStaffComponent },
  { path: 'filter', component: MenuFilterComponent },
  { path: 'customer-menu', component: CustomerInterfaceComponent },
  { path: '2FA', component: TwoFactorAuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
