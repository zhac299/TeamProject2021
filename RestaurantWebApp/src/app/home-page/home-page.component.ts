import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectTableDialogComponent } from './select-table-dialog/select-table-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})

/**
 * The class that handles the home page
 */
export class HomePageComponent implements OnInit {

  /**
   * The constructor of the class.
   * 
   * @param elementRef an element ref
   * @param router the router to navigate to the staff login
   * @param dialog a mat dialog
   */
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private dialog: MatDialog) { }

  /**
   * A set-up method that gets called once when the class gets instantiated.
   */
  ngOnInit(): void { }

  /**
   * Opens the select table dialog.
   */
  openSelectTableDialog(): void {
    const dialogRef = this.dialog.open(SelectTableDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * Routes to the staff login menu.
   */
  forEmployee() {
    this.router.navigateByUrl('login');
  }

}
