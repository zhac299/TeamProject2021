import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../models/Table';
import {MatDialog} from '@angular/material/dialog';
import {Order} from "../../models/Order";
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";
import {Observable} from "rxjs";
import {PickTableDialogComponent} from "./pick-table-dialog/pick-table-dialog.component";
import { TableService } from '../table.service';
import { switchMap } from 'rxjs/operators';

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

  openSelectTableDialog(): Observable<Table> {
    const dialogRef = this.dialog.open(PickTableDialogComponent);
    return dialogRef.afterClosed();
  }


  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

  createNewTable(): void {
    this.tableService.createTable().subscribe();
  }

}

