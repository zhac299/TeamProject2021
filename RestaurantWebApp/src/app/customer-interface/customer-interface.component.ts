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
import { Meal } from 'src/models/Meal';
import { MealService } from '../meal.service';

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
export class CustomerInterfaceComponent implements OnInit {

  selectedMeals: Meal[] = [];
  menu: Menu[];
  cat: selectedCategory = new selectedCategory;
  paramsObject: any;
  customer: Observable<Customer>;
  table:Observable<Table>;

  constructor(private menuService: MenuService,
              private mealService: MealService,
              private customerService: CustomerService,
              private tableService: TableService,
              private menuFilterService: MenuFilterService,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              public dialog: MatDialog,
              private router:Router) { }

  ngAfterViewInit(): void {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
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
    var mealNotPresent: Boolean = true;
    for(var i = 0 ; i < this.selectedMeals.length; i++) {
      if (this.selectedMeals[i].menu == menuItem) {
        this.selectedMeals[i].numberSelections += 1;
        mealNotPresent = false;
      }
    }
    if (mealNotPresent) {
      const newMeal = new Meal();
      newMeal.menu = menuItem;
      newMeal.numberSelections = 1;
      this.selectedMeals.push(newMeal);
    }
  }

  removeMeal(menuItem: Menu): void {
    for(var i = 0; i < this.selectedMeals.length; i++) {
      if(this.selectedMeals[i].menu == menuItem) {
        this.selectedMeals[i].numberSelections -= 1;
        if(this.selectedMeals[i].numberSelections == 0) {
          this.selectedMeals.splice(i);
        }
      }
    }
  }

  clearMeal(menuItem: Menu): void {
    for(var i = 0; i < this.selectedMeals.length; i++) {
      if (this.selectedMeals[i].menu == menuItem) {
        this.selectedMeals.splice(i);
      }
    }
  }

  getNumberOfSelections(menuItem: Menu): number {
    for(let meal of this.selectedMeals) {
      if(meal.menu == menuItem) {
        return meal.numberSelections;
      }
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
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
