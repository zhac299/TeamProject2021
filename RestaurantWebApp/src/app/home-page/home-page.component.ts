import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectTableDialogComponent } from './select-table-dialog/select-table-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private router:Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {}
  
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
  }

  openSelectTableDialog() : void {
    const dialogRef = this.dialog.open(SelectTableDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  forEmployee() { 
    this.router.navigateByUrl('login'); 
  }

}
