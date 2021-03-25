import { Component, OnInit } from '@angular/core';
import { Table } from '../../models/Table';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from "../menu.service";
import { Menu } from "../../models/Menu";
import { Observable } from "rxjs";
import { PickTableDialogComponent } from "./pick-table-dialog/pick-table-dialog.component";
import { TableService } from '../table.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Staff } from '../../models/Staff';
import { StaffService } from '../staff.service';
import { CustomerService } from '../customer.service';
import { OrderService } from '../order.service';
import { AddMenuDialogComponent } from './add-menu-dialog/add-menu-dialog.component';

/**
 * Component for all waiter staff specific features including their related permissions
 */
@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.sass'],
})
export class WaiterMenuComponent implements OnInit {

  /**
   *
   * @param route to access params from parent component
   * @param menuService to perform crud on menus
   * @param dialog to open/close dialogs
   * @param staffService to perform crud on staff objects
   * @param tableService to perform crud on tables
   * @param customerService to perform crud on customers
   * @param orderService to perform crud on orders
   */
  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    public dialog: MatDialog,
    private staffService: StaffService,
    private tableService: TableService,
    private customerService: CustomerService,
    private orderService: OrderService
  ) { }

  /**
   * The staff that has logged in to the waiter component
   */
  waiter: Staff;

  /**
   * Helper paramObject to route to this page with an ID
   * after logging in
   */
  paramsObject: any;

  /**
   * Initialises with given waiter ID through the activated route
   * and initialises order and table services with this waiter Id.
   */
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.staffService.getStaffById(this.paramsObject.params.staffId).subscribe((staff) => {
        this.waiter = staff;
        this.orderService.waiterId = this.waiter.id;
        this.tableService.currentStaff = this.waiter.id;
      })
    });
  }


  /**
   * Opens dialog that helps user to select a table
   */
  openSelectTableDialog(): Observable<Table> {
    const dialogRef = this.dialog.open(PickTableDialogComponent);
    return dialogRef.afterClosed();
  }


  /**
   * Deletes a menu
   * @param menu to delete
   */
  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

  /**
   * Creates new table
   */
  createNewTable(): void {
    this.tableService.createTable().subscribe();
  }

  /**
   * Creates a new order with a new customer
   */
  createNewOrder(): void {
    this.openSelectTableDialog()
      .pipe(
        switchMap((dialogResult) =>
          this.customerService.createCustomerWithTable(dialogResult))
      ).subscribe((a) =>
        this.orderService.createNewOrderWithCustomer(a)
      );
  }

  /**
   * Opens dialog to add menu item
   */
  openAddMenuDialog() {
    const title = "Add New Dish";
    let menu: Menu = new Menu();
    const hasMenuItem: boolean = false;
    const dialogRef = this.dialog.open(AddMenuDialogComponent, {
      data: { menu, title, hasMenuItem },
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(menu => {
      if (menu) {
        this.menuService.createMenuItem(menu);
      }
    })
  }

}

