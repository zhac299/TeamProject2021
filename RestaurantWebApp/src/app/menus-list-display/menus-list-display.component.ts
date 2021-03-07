import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "../waiter-menu/edit-dialog/edit-dialog.component";
import {AddMenuDialogComponent} from "../waiter-menu/add-menu-dialog/add-menu-dialog.component";
import {Subscription, timer} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-menus-list-display',
  templateUrl: './menus-list-display.component.html',
  styleUrls: ['./menus-list-display.component.sass']
})
export class MenusListDisplayComponent implements OnInit, OnDestroy {

  constructor(private menuService: MenuService,
              public dialog: MatDialog) { }

  menuList: Menu[] = [];
  subscription: Subscription;
  refreshTimer$ = timer(0, 5000)
    .pipe(tap(() => console.log('Fetching Menus...')));

  ngOnInit(): void {
    this.subscription = this.refreshTimer$.subscribe(this.menuService.refresh$);
    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openEditMenuDialog(menu:Menu): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: menu,
      width: '40%',
      height: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.menuService.updateMenu(result);
        this.refreshTimer$.subscribe();
      }
    });

  }

  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

  openAddMenuDialog() {
    let newMenu: Menu = new Menu();
    const dialogRef = this.dialog.open(AddMenuDialogComponent, {
      data: newMenu,
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(menu => {
      if(menu){
        this.menuService.createMenuItem(menu);
      }
    })
  }



}
