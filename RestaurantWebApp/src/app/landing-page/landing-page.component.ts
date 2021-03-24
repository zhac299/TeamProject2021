import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import anime from "animejs/lib/anime.es";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SelectTableDialogComponent} from "../home-page/select-table-dialog/select-table-dialog.component";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class LandingPageComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef,
              private dialog: MatDialog) { }
  ngOnInit(): void {
  }

  toMenu(){
    const dialogRef = this.dialog.open(SelectTableDialogComponent);
    dialogRef.afterClosed().pipe(tap((result)=> console.log(result))).subscribe()
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.backgroundImage = 'url(assets/images/background.jpg)';

    // ANIMATE TITLE
    anime.timeline({loop: false})
      .add({
        targets: '.title',
        opacity: [0,1],
        scale: 1.5,
        easing: "easeInOutQuad",
        duration: 3000
      }).add({
        targets: '.title',
        translateY: -25,
        duration: 2000
      }).add({
        targets: '.btn',
        opacity:[0,1],
        scale: 1.5,
        duration: 500
    });

    anime.timeline({loop:true})
      .add({
        targets: '.btn',
        scale: [1,1.10,1],
        ease: 'easeInOutQuad',
        duration: 5000
      })
  }

}
