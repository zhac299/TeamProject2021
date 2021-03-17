import { Component, OnInit } from '@angular/core';
import { MatListModule} from '@angular/material/list';
import { MenusListDisplayComponent } from '../menus-list-display/menus-list-display.component';
@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.sass']
})
export class ManagerMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
