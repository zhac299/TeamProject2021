import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  forCustomer() { 
    this.router.navigateByUrl('home');   
}
    forEmployee() { 
        this.router.navigateByUrl('login'); 
    }

}
