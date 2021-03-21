import {Component, OnInit} from '@angular/core';
import {Table} from "../../models/Table";
import {Order} from "../../models/Order";
import { Menu } from '../../models/Menu';
import { MenuService } from '../menu.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMenuDialogComponent } from '../waiter-menu/add-menu-dialog/add-menu-dialog.component';

@Component({
  selector: 'app-kitchen-menu',
  templateUrl: './kitchen-menu.component.html',
  styleUrls: ['./kitchen-menu.component.sass']
})
export class KitchenMenuComponent implements OnInit {

  showFiller = false;
  tableList: Table[] = [];
  freeTables = 0;
  orders: Order[];
  displayedColumns: string[] = ['name', 'description', 'price'];
  getOrders = true;
  isComplete: boolean;

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog) { }
    
  ngOnInit(): void {}

  openAddMenuDialog() {
    const title = "Add New Dish";
    let menu: Menu = new Menu();
    const dialogRef = this.dialog.open(AddMenuDialogComponent, {
      data: {menu,title},
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(menu => {
      if(menu){
        console.log(menu);
        this.menuService.createMenuItem(menu);
      }
    })
  }

}
