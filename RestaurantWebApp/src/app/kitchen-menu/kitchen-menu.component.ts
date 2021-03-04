import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {MenuService} from "../menu.service";
import {CustomerService} from "../customer.service";
import {MatDialog} from "@angular/material/dialog";
import {TableService} from "../table.service";
import {Menu} from "../../models/Menu";
import {Table} from "../../models/Table";
import {Order} from "../../models/Order";
import {OrderComponent} from "../waiter-menu/order/order.component";
import {EditDialogComponent} from "../waiter-menu/edit-dialog/edit-dialog.component";
import {Observable, Subscription, timer} from "rxjs";
import {PickTableDialogComponent} from "../waiter-menu/pick-table-dialog/pick-table-dialog.component";
import {switchMap, tap} from "rxjs/operators";
import {AddMenuDialogComponent} from "../waiter-menu/add-menu-dialog/add-menu-dialog.component";

@Component({
  selector: 'app-kitchen-menu',
  templateUrl: './kitchen-menu.component.html',
  styleUrls: ['./kitchen-menu.component.sass']
})
export class KitchenMenuComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  menuList: Menu[] = [];
  showFiller = false;
  tableList: Table[] = [];
  freeTables = 0;
  orders: Order[];
  displayedColumns: string[] = ['name', 'description', 'price'];
  // refreshTimer$ = timer(0, 5000).pipe(tap(() => console.log('Fetching...')));
  // orders$ = this.orderService.orders$;
  getOrders = true;

  constructor(
    private orderService: OrderService,
    private menuService: MenuService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    public tableService: TableService
  ) { }

  ngOnInit(): void {
    // this.subscription = this.refreshTimer$.subscribe(this.orderService.refresh$);
    // this.orderService.getUpdatedOrders();
    this.menuService.getAllUpdatedMenus();
    this.tableService.getUpdatedTables()

    // this.orderService.orders$.subscribe((orders) => {
    //   this.orders = orders;
    // });
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
    this.tableService.tables$.subscribe((tables) => {
      this.tableList = tables;
    })
  }

  // openOrderDialog(order: Order): void {
  //   // this.dialogTable = table;
  //   const dialogRef = this.dialog.open(OrderComponent, {
  //     data: order,
  //     width: '99%',
  //     height: '99%'
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.orderService.getUpdatedOrders();
  //       // this.orderService.updateOrder(result);
  //     }
  //   });
  // }

  openAddDialog(menu:Menu): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: menu,
      width: '40%',
      height: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result){
        this.menuService.updateMenu(result);
      }
    });
    this.menuService.getAllUpdatedMenus();
  }

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

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
