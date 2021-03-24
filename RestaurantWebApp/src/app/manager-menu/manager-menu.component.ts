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
export class ManagerMenuComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private tableService: TableService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void { }

  openSelectTableDialog(): Observable<Table> {
    const dialogRef = this.dialog.open(PickTableDialogComponent);
    return dialogRef.afterClosed();
  }

  createNewOrder(): void {
    this.openSelectTableDialog()
      .pipe(
        switchMap((dialogResult) =>
          this.customerService.createCustomerWithTable(dialogResult))
      ).subscribe((a) =>
        this.orderService.createNewOrderWithCustomer(a)
      );
  }

  createNewTable(): void {
    this.tableService.createTable().subscribe();
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
        this.menuService.createMenuItem(menu);
      }
    })
  }

}
