import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SelectTableDialogComponent } from './select-table-dialog/select-table-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {}

  openSelectTableDialog() {
    const dialogRef = this.dialog.open(SelectTableDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // forCustomer() { 
  //   this.router.navigateByUrl('customer-menu');   
  // }

  forEmployee() { 
    this.router.navigateByUrl('login'); 
  }

}
