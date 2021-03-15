import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
@Component({
  selector: 'expansion-pannel',
  templateUrl: './expansion-pannel.component.html',
  styleUrls: ['./expansion-pannel.component.sass']
})
export class ExpansionPannelComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
 }
}
