import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { Order } from '../../models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
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
import { animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import { Meal } from 'src/models/Meal';
import { MealService } from '../meal.service';
import { OrderTrackerComponent } from './order-tracker/order-tracker.component';
import {MenuCategory} from "../../models/MenuCategory";
import { take, tap } from 'rxjs/operators';
import { MenuCategoryService } from '../menu-category.service';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass'],
  animations: [
    trigger('listAnimation', [
      transition('*=>*', [
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('100ms', [
          animate('.5s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-50px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(15px)', offset: 0.3}),
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
  paramsObject: any;
  customer: Observable<Customer>;
  table:Observable<Table>;
  orderPlaced: Boolean = false;
  categories: MenuCategory[];
  selectedCategory: MenuCategory;
  cartCount: number = 0;
  changedCategory = false;

  constructor(private menuService: MenuService,
              private menuCategoryService: MenuCategoryService,
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

  ngOnInit():void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.customer = this.customerService.getCustomerByID(this.paramsObject.params.customerID)
      this.table = this.tableService.getTableByNumber(this.paramsObject.params.selectedTable)
    });

    this.menuCategoryService.getMenuCategories().subscribe((categories) => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
    });

    this.findCategoryItems();
  }

  findCategoryItems(): void {
    this.menuService.getMenus().subscribe((menu) => {
      this.menu = [];
      menu.forEach((menuItem) => {
        if (menuItem.category.category == this.selectedCategory.category) {
          this.menu.push(menuItem);
        }
      })
    });
  }

  async filter(filteredArgs: string): Promise<void> {
    this.menuFilterService.filter(filteredArgs).subscribe((filteredMenu) => {
      for (var i = 0; i < this.menu.length; i++ ) {
        let containsItem = false;
        for (var j = 0; j < filteredMenu.length; j++) {
          if (this.menu[i].name == filteredMenu[j].name) {
            containsItem = true;
          }
        }
        if(containsItem == false) {
          this.menu.splice(i);
        }
      }
    })
  }

  addMeal(menuItem: Menu): void {
    console.log(menuItem);
    console.log(this.selectedMeals)
    console.log(this.getNumberOfSelections(menuItem))
    var mealNotPresent: Boolean = true;
    for(var i = 0 ; i < this.selectedMeals.length; i++) {
      if (this.selectedMeals[i].menu.name == menuItem.name) {
        this.selectedMeals[i].numberSelections += 1;
        mealNotPresent = false;
      }
    }
    if (mealNotPresent) {
      const newMeal = new Meal();
      newMeal.menu = menuItem;
      newMeal.numberSelections = 1;
      this.selectedMeals.push(newMeal);
      this.cartCount++;
    }
  }

  removeMeal(menuItem: Menu): void {
    for(var i = 0; i < this.selectedMeals.length; i++) {
      if(this.selectedMeals[i].menu.name == menuItem.name) {
        this.selectedMeals[i].numberSelections -= 1;
        if(this.selectedMeals[i].numberSelections == 0) {
          this.selectedMeals.splice(i);
          this.cartCount--;
        }
      }
    }
  }

  clearMeal(menuItem: Menu): void {
    for(var i = 0; i < this.selectedMeals.length; i++) {
      if (this.selectedMeals[i].menu.name == menuItem.name) {
        this.selectedMeals.splice(i);
        this.cartCount--;
      }
    }
  }

  getNumberOfSelections(menuItem: Menu): number {
    for(let meal of this.selectedMeals) {
      if(meal.menu.name == menuItem.name) {
        return meal.numberSelections;
      }
    }
    return 0;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {customer:this.customer, selectedMeals: this.selectedMeals};
    dialogConfig.width = "60%";
    dialogConfig.backdropClass = "basket";
    const dialogRef = this.dialog.open(BasketComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(orderPlaced => {
      this.orderPlaced = orderPlaced;
      if(this.selectedMeals && this.selectedMeals.length > 0) {
        this.cartCount = this.selectedMeals.length;
      } else {
        this.cartCount = 0;
      }
    });
  }

  openTracker(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {customer: this.customer};
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(OrderTrackerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(orderPlaced => {
      this.orderPlaced = orderPlaced;
    });
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  selectCategory(category: MenuCategory): void {
    this.selectedCategory = category;
    this.findCategoryItems();
  }

}
