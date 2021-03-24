import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Menu } from '../../models/Menu';
import { Table } from '../../models/Table';
import { CustomerService } from '../customer.service';
import { MenuService } from '../menu.service';
import { OrderService } from '../order.service';
import { TableService } from '../table.service';
import { AddMenuDialogComponent } from '../waiter-menu/add-menu-dialog/add-menu-dialog.component';
import { PickTableDialogComponent } from '../waiter-menu/pick-table-dialog/pick-table-dialog.component';
@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.sass']
})

/**
 * The class that handles the manager menu.
 */
export class ManagerMenuComponent implements OnInit {

  /**
   * The constructor of the class.
   * 
   * @param orderService the order service that is used to make requests
   * @param customerService the customer service that is used to make requests
   * @param dialog a mat dialog
   * @param tableService the table service that is used to make requests
   * @param menuService the menu service that is used to make requests
   */
  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private tableService: TableService,
    private menuService: MenuService
  ) { }

  /**
   * A set-up method that gets called once when the class gets instantiated.
   */
  ngOnInit(): void { }

  /**
   * Opens the select table dialog.
   * 
   * @returns the dialog ref after it's closed
   */
  openSelectTableDialog(): Observable<Table> {
    const dialogRef = this.dialog.open(PickTableDialogComponent);
    return dialogRef.afterClosed();
  }

  /**
   * Creates a new order.
   * Opens the select table dialog and with the selected table, it creates
   * a new order with a customer and table.
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
   * Creates a new table by making a post request to the Table DB.
   */
  createNewTable(): void {
    this.tableService.createTable().subscribe();
  }

  /**
   * Opens the menu dialog. After closing the dialog it creates a new menu item.
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
        this.menuService.createMenuItem(menu);
      }
    })
  }

}
