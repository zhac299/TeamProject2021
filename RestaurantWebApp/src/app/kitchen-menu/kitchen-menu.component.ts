import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Order } from "../../models/Order";
import { Menu } from '../../models/Menu';
import { MenuService } from '../menu.service';
import { AddMenuDialogComponent } from '../waiter-menu/add-menu-dialog/add-menu-dialog.component';

@Component({
  selector: 'app-kitchen-menu',
  templateUrl: './kitchen-menu.component.html',
  styleUrls: ['./kitchen-menu.component.sass']
})

/**
 * The class that handles the kitchen menu.
 */
export class KitchenMenuComponent implements OnInit {

  /**
   * The orders list that is available to the kitchen menu.
   */
  orders: Order[];

  /**
   * The Displayed columns for each item in the order dialog.
   */
  displayedColumns: string[] = ['name', 'description', 'price'];

  /**
   * The constructor of the class.
   * 
   * @param menuService the menu service that is used to make get and, post and put requests
   * @param dialog a mat dialog
   */
  constructor(
    private menuService: MenuService,
    public dialog: MatDialog) { }
    
    ngOnInit(): void { }
    
   /**
    * Method for opening up panel to add a new dish.
    */  
  openAddMenuDialog() {
    const title = "Add New Dish";
    let menu: Menu = new Menu();
    const dialogRef = this.dialog.open(AddMenuDialogComponent, {
      data: { menu, title },
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(menu => {
      if (menu) {
        console.log(menu);
        this.menuService.createMenuItem(menu);
      }
    })
  }

}
