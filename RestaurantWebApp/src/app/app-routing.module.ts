import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInterfaceComponent } from './customer-interface/customer-interface.component';
import { InitialMenuComponent } from './initial-menu/initial-menu.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { OrderListComponent } from './order-list/order-list.component';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
    { path: '', component: LoginInputComponent },
    { path: 'waiter-menu', component: WaiterMenuComponent },
    { path: 'order-list', component: OrderListComponent },
    { path: 'initial-menu', component: InitialMenuComponent },
    { path: 'customer-interface', component: CustomerInterfaceComponent },
    { path: 'home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
