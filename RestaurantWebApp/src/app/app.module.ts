import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListComponent } from './order-list/order-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InitialMenuComponent } from './initial-menu/initial-menu.component';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';
import { CustomerInterfaceComponent } from './customer-interface/customer-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    InitialMenuComponent,
    WaiterMenuComponent,
    CustomerInterfaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
