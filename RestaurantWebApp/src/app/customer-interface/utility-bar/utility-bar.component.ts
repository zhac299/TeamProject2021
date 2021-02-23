import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BasketComponent } from './basket/basket.component';

@Component({
  selector: 'utility-bar',
  templateUrl: './utility-bar.component.html',
  styleUrls: ['./utility-bar.component.sass']
})
export class UtilityBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
}
