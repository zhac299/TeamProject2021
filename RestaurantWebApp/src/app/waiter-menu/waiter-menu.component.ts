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
import {Customer} from "../../models/Customer";

@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.sass'],
})
export class WaiterMenuComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private menuService: MenuService,
    private customerService: CustomerService,
    public dialog: MatDialog
  ) { }

  menuList: Menu[] = [];
  showFiller = false;
  tableList: Table[] = [];
  freeTables = 0;
  orders: Order[];
  displayedColumns: string[] = ['name', 'description', 'price'];

  ngOnInit(): void {
    this.orderService.getUpdatedOrders();
    this.menuService.getAllUpdatedMenus();

    this.orderService.orders$.subscribe((orders) => {
      this.orders = orders;
    });
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
  }

  openOrderDialog(order: Order): void {
    // this.dialogTable = table;
    const dialogRef = this.dialog.open(OrderComponent, {
      data: order,
      width: '99%',
      height: '99%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.updateOrder(result);
      }
    });
  }

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

  createNewOrder(table: Table): void {
    //this.customerService.createCustomerWithTable(table);
    // this.orderService.
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

