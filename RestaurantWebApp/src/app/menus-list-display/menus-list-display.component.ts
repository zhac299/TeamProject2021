import { Component, OnInit } from '@angular/core';
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "../waiter-menu/edit-dialog/edit-dialog.component";
import {AddMenuDialogComponent} from "../waiter-menu/add-menu-dialog/add-menu-dialog.component";

@Component({
  selector: 'app-menus-list-display',
  templateUrl: './menus-list-display.component.html',
  styleUrls: ['./menus-list-display.component.sass']
})
export class MenusListDisplayComponent implements OnInit {

  constructor(private menuService: MenuService,
              public dialog: MatDialog) { }

  menuList: Menu[] = [];

  ngOnInit(): void {
    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
  }

  openAddDialog(menu:Menu): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: menu,
      width: '40%',
      height: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.menuService.updateMenu(result);
      }
    });
    this.menuService.getAllUpdatedMenus();
  }

  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

  openAddMenuDialog() {
    let newMenu: Menu = new Menu();
    const dialogRef = this.dialog.open(AddMenuDialogComponent, {
      data: newMenu,
      width:'40%',
      height:'75%'
    });

    dialogRef.afterClosed().subscribe(menu => {
      if(menu){
        this.menuService.createMenuItem(menu);
      }
    })
  }

}
