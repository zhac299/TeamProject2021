import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";
import anime from "animejs/lib/anime.es";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  windowWidth: number;
  windowHeight: number;

  constructor(private elementRef: ElementRef) { }

  resize$ = fromEvent(window, 'resize');
  ngOnInit(): void {
    this.resize$
      .pipe(debounceTime(50),
        tap(evt=>console.log('window.innerWidth=', window.innerWidth, this.windowWidth)),
        map((w) => {
          return window
        })
      )
      .subscribe((w) => {
        this.windowWidth = w.innerWidth;
        this.windowHeight = w.innerHeight;
        });

  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.backgroundImage = 'url(assets/images/background.jpg)';
    this.elementRef.nativeElement.ownerDocument.body.width = this.windowWidth;
    // var title = document.getElementById('title');
    // title.style.width= `${this.windowWidth}px`;

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
        duration: 1000
    });
  }

}
