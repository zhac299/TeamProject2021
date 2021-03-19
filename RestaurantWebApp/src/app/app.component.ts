import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { fader } from "./routeAnimations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [fader]
})
export class AppComponent {
  title = 'RestaurantWebApp';
  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData;
  }
}
