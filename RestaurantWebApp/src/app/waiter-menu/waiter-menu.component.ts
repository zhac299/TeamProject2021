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
import { ActivatedRoute } from '@angular/router';
import { Staff } from 'src/models/Staff';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.sass'],
})
export class WaiterMenuComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    public dialog: MatDialog,
    private staffService: StaffService,
  ) { }

  menuList: Menu[] = [];
  showFiller = false;
  orders: Order[];
  displayedColumns: string[] = ['name', 'description', 'price'];
  waiter: Staff;
  paramsObject: any;

  ngOnInit(): void {
    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.staffService.getStaffById(this.paramsObject.params.staffId).subscribe((staff) => {
        this.waiter = staff;
        console.log(staff);
      })
    });
  }

  openSelectTableDialog(): Observable<Table> {
    const dialogRef = this.dialog.open(PickTableDialogComponent);
    return dialogRef.afterClosed();
  }


  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

}

