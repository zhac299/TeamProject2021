import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { MenuService } from "../menu.service";
import { MenuFilterService } from "../menu-filter.service";
import { Menu } from "../../models/Menu";
import { BasketComponent } from './basket/basket.component';
import { animate, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";
import { Meal } from '../../models/Meal';
import { OrderTrackerComponent } from './order-tracker/order-tracker.component';
import { MenuCategory } from "../../models/MenuCategory";
import { MenuCategoryService } from '../menu-category.service';
import anime from 'animejs/lib/anime.es.js'

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('listAnimation', [
      transition('*=>*', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('100ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
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
  orderPlaced: Boolean = false;
  categories: MenuCategory[];
  selectedCategory: MenuCategory;

  constructor(private menuService: MenuService,
    private menuCategoryService: MenuCategoryService,
    private menuFilterService: MenuFilterService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    public dialog: MatDialog,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
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
      for (var i = 0; i < this.menu.length; i++) {
        let containsItem = false;
        for (var j = 0; j < filteredMenu.length; j++) {
          if (this.menu[i].name == filteredMenu[j].name) {
            containsItem = true;
          }
        }
        if (containsItem == false) {
          this.menu.splice(i);
        }
      }
    })
  }

  addMeal(menuItem: Menu): void {
    var mealNotPresent: Boolean = true;
    for (var i = 0; i < this.selectedMeals.length; i++) {
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
    }
  }

  removeMeal(menuItem: Menu): void {
    for (var i = 0; i < this.selectedMeals.length; i++) {
      if (this.selectedMeals[i].menu.name == menuItem.name) {
        this.selectedMeals[i].numberSelections -= 1;
        if (this.selectedMeals[i].numberSelections == 0) {
          this.selectedMeals.splice(i);
        }
      }
    }
  }

  clearMeal(menuItem: Menu): void {
    for (var i = 0; i < this.selectedMeals.length; i++) {
      if (this.selectedMeals[i].menu.name == menuItem.name) {
        this.selectedMeals.splice(i);
      }
    }
  }

  getNumberOfSelections(menuItem: Menu): number {
    for (let meal of this.selectedMeals) {
      if (meal.menu.name == menuItem.name) {
        return meal.numberSelections;
      }
    }
    return 0;
  }

  openBasket() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { customerId: this.paramsObject.params.customerID, selectedMeals: this.selectedMeals, tableNumber: this.paramsObject.params.selectedTable };
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(BasketComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(orderPlaced => {
      this.orderPlaced = orderPlaced;
    });
  }

  openTracker() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {  customerId: this.paramsObject.params.customerID, tableNumber: this.paramsObject.params.selectedTable };
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

  elevate(category: any) {
    anime.timeline({ loop: false })
      .add({
        targets: `${category}`,
        opacity: [0, 1],
        scale: 2,
        easing: "easeInOutQuad",
        duration: 1000,
        delay: (el, i) => 50 * (i + 1)
      });
  }
}
