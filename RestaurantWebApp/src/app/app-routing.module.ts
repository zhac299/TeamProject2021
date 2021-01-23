import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './login-input/login-input.component';
import { WaiterMenuComponent } from './waiter-menu/waiter-menu.component';


const routes: Routes = [
    { path: '', component: InputComponent },
    {path: 'waiter-menu', component: WaiterMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
