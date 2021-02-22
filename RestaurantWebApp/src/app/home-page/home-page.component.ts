import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open();

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  forCustomer() { 
    this.router.navigateByUrl('customer-menu');   
  }

  forEmployee() { 
    this.router.navigateByUrl('login'); 
  }

}
