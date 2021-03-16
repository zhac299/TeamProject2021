import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";

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
  }

}
