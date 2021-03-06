import {Component, OnInit} from '@angular/core';
import {Table} from '../../models/Table';
import {MatDialog} from '@angular/material/dialog';
import {OrderComponent} from './order/order.component';
import {OrderService} from "../order.service";
import {Order} from "../../models/Order";
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";
import {AddMenuDialogComponent} from "./add-menu-dialog/add-menu-dialog.component";
import {CustomerService} from "../customer.service";
import {Observable} from "rxjs";
import {PickTableDialogComponent} from "./pick-table-dialog/pick-table-dialog.component";
import {switchMap, tap} from "rxjs/operators";
import { TableService } from '../table.service';

@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.sass'],
})
export class WaiterMenuComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog,
    public tableService: TableService
  ) { }

  menuList: Menu[] = [];
  showFiller = false;
  tableList: Table[] = [];
  freeTables = 0;
  orders: Order[];
  displayedColumns: string[] = ['name', 'description', 'price'];

  ngOnInit(): void {
    this.menuService.getAllUpdatedMenus();
    this.tableService.getUpdatedTables()

    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
    this.tableService.tables$.subscribe((tables) => {
      this.tableList = tables;
    })
  }

  openAddDialog(menu:Menu): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: menu,
      width: '40%',
      height: '75%'
    });

    dialogRef.afterClosed().pipe(
      tap(() => this.menuService.getAllUpdatedMenus())
    ).subscribe(result => {
      // console.log(result);
      if (result){
        this.menuService.updateMenu(result);
      }
    });
    // this.menuService.getAllUpdatedMenus();
  }

  openSelectTableDialog(): Observable<Table> {
    const dialogRef = this.dialog.open(PickTableDialogComponent);
    return dialogRef.afterClosed();
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

