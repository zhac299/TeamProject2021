import { AfterViewInit, Component, ElementRef } from '@angular/core';
@Component({
  selector: 'expansion-pannel',
  templateUrl: './expansion-pannel.component.html',
  styleUrls: ['./expansion-pannel.component.sass']
})

/**
 * The class that handles the expansion pannel actions.
 */
export class ExpansionPannelComponent implements AfterViewInit {

  /**
   * The constructor of the class.
   * 
   * @param elementRef an element ref
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * Sets the background colour.
   */
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
  }
}
