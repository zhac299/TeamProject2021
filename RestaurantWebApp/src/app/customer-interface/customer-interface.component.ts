import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { Order } from '../../models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";

import { MenuService} from "../menu.service";
import { MenuFilterService} from "../menu-filter.service";
import { Menu } from "../../models/Menu";
import { selectedCategory } from "../../models/selectedCategory";
import { Customer } from 'src/models/Customer';
import { CustomerService } from '../customer.service';
import { BasketComponent} from './basket/basket.component';
import { Table } from 'src/models/Table';
import { TableService } from '../table.service';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass'],
  animations: [
    trigger('listAnimation', [
      transition('*=>*', [
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-50px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]))


      ])
    ])
  ]
})
export class CustomerInterfaceComponent implements OnInit, AfterViewInit {

  selectedMeals: Menu[] = [];
  menu: Menu[];
  cat: selectedCategory = new selectedCategory;
  paramsObject: any;
  customer: Observable<Customer>;
  table:Observable<Table>;

  constructor(private menuService: MenuService,
              private customerService: CustomerService,
              private tableService: TableService,
              private menuFilterService: MenuFilterService,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              public dialog: MatDialog,
              private router:Router) { }

  ngAfterViewInit(): void {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#831111';
    }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.customer = this.customerService.getCustomerByID(this.paramsObject.params.customerID)
      this.table = this.tableService.getTableByNumber(this.paramsObject.params.selectedTable)
    });

    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe((menu)=> {
        this.menu=menu;
    });
    this.cat = this.menuService.getCat();
  }

  filter(filterArgs: string): void {
      this.menuFilterService.filter(filterArgs).subscribe(orders => {
          this.menuService.setCat(orders);
    });
  }

  addMeal(menuItem: Menu): void {
    if (!this.selectedMeals.includes(menuItem)) {
      menuItem.selections = 1;
      this.selectedMeals.push(menuItem);
    } else {
      let index: number = this.selectedMeals.indexOf(menuItem);
      this.selectedMeals[index].selections += 1;
    }
  }

  removeMeal(menuItem: Menu): void {
    if (this.selectedMeals.includes(menuItem)) {
      let index: number = this.selectedMeals.indexOf(menuItem);
      this.selectedMeals[index].selections -= 1;
      if(this.selectedMeals[index].selections == 0){
        this.selectedMeals.splice(index);
      }
    }
  }

  clearMeal(menuItem:Menu): void {
    if (this.selectedMeals.includes(menuItem)) {
      let index: number = this.selectedMeals.indexOf(menuItem);
      this.selectedMeals.splice(index);
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {customer:this.customer, selectedMeals: this.selectedMeals};

    const dialogRef = this.dialog.open(BasketComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }
}
