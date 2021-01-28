import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInterfaceComponent } from './customer-interface/customer-interface.component';
import { InitialMenuComponent } from './initial-menu/initial-menu.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { OrderListComponent } from './order-list/order-list.component';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import {OrderComponent} from './waiter-menu/order/order.component';

const routes: Routes = {
  {path: 'table/:id', component: OrderComponent},
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginInputComponent },
  { path: 'waiter-menu', component: WaiterMenuComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'initial-menu', component: InitialMenuComponent },
  { path: 'home', component: CustomerInterfaceComponent }
];
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
