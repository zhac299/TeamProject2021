import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";
import {MatDialog} from "@angular/material/dialog";
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
    const title = "Edit Dish";
    const dialogRef = this.dialog.open(AddMenuDialogComponent, {
      data: {menu,title},
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result);
        this.menuService.update(result).subscribe();
        this.refreshTimer$.subscribe();
      }
    });

  }

  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

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
