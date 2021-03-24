import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { animate, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";
import anime from 'animejs/lib/anime.es.js'

import { MenuService } from "../menu.service";
import { MenuFilterService } from "../menu-filter.service";
import { Menu } from "../../models/Menu";
import { BasketComponent } from './basket/basket.component';
import { OrderTrackerComponent } from './order-tracker/order-tracker.component';
import { MenuCategory } from "../../models/MenuCategory";
import { MenuCategoryService } from '../menu-category.service';
import { Meal } from '../../models/Meal';

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

/**
 * The class that handles the customer menu.
 */
export class CustomerInterfaceComponent implements OnInit {

  /**
   * The meal list selected by the customer.
   */
  selectedMeals: Meal[] = [];

  /**
   * The menu list.
   */
  menu: Menu[];

  /**
   * The params of the activated route
   */
  paramsObject: any;

  /**
   * Asserts if the order was placed or not.
   */
  orderPlaced: Boolean = false;

  /**
   * The categories list of the menu.
   */
  categories: MenuCategory[];

  /**
   * The current selected category.
   */
  selectedCategory: MenuCategory;

  /**
   * The constructor of the class.
   * 
   * @param menuService the menu service that is used to make get requests
   * @param menuCategoryService the menu category service that is used to make get requets
   * @param menuFilterService the menu filter service that is used to make get requests
   * @param route the activated route from the home page
   * @param dialog a mat dialog
   * @param router a router to navigate to the home page
   */
  constructor(private menuService: MenuService,
    private menuCategoryService: MenuCategoryService,
    private menuFilterService: MenuFilterService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) { }

  /**
   * A set-up method that gets called once when the class gets instantiated.
   * It subscribed to activated route query params and sets the paramsObject.
   * It makes a get reuqest to the the menuCategory DB by subscribing to getMenuCategories()
   * that returns an Category[] Observale. Inside the subscription, it sets the categories.
   */
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

  /**
   * Returns a list of the menu items in that category.
   * It makes a get request to the Menu DB by subscribing to getMenus() that
   * returns a Menu[] observable. Then it filters the menu items by the selected category.
   */
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

  /**
   * Filters the menu items in the selected category by calories and allergens.
   * It makes a get request to the Menu DB by subscribing to filter() that returns
   * an Menu[] observable with the filtered menu items. Inside the subscription, 
   * it filters the filtered by category menu with the allergies and callories.
   * 
   * @param filteredArgs the filter arguments
   */
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

  /**
   * Adds a meal to the selected meals or increases the number of selections
   * of that meal if already present.
   * 
   * @param menuItem the menu item to be added
   */
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

  /**
   * Decreases the number of selections of a meal or removes it from the list
   * if the number of selections is 1.
   * 
   * @param menuItem the menu item to be removed
   */
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

  /**
   * Deletes a meal from the selected meals list.
   * 
   * @param menuItem the menu item to be cleared
   */
  clearMeal(menuItem: Menu): void {
    for (var i = 0; i < this.selectedMeals.length; i++) {
      if (this.selectedMeals[i].menu.name == menuItem.name) {
        this.selectedMeals.splice(i);
      }
    }
  }

  /**
   * Gets the number of selections of a meal.
   * 
   * @param menuItem the menu item 
   * @returns the number of selections
   */
  getNumberOfSelections(menuItem: Menu): number {
    for (let meal of this.selectedMeals) {
      if (meal.menu.name == menuItem.name) {
        return meal.numberSelections;
      }
    }
    return 0;
  }

  /**
   * Opens the basket dialog.
   * It configures the data to be injected in the dialog using the dialog config, passing
   * the customer ID, the selected meals and the table Number.
   * After the dialog is closedm it uodates the orderPlaced field.
   */
  openBasket() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { customerId: this.paramsObject.params.customerID, selectedMeals: this.selectedMeals, tableNumber: this.paramsObject.params.selectedTable };
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(BasketComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(orderPlaced => {
      this.orderPlaced = orderPlaced;
    });
  }

  /**
   * Opens the order tacker dialog.
   * It configures the data to be injected in the dialog using the dialog config, passing
   * the customer ID and table number to the orders tracker.
   * After the dialog is closed, it updates the orderPlaced field.
   */
  openTracker() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { customerId: this.paramsObject.params.customerID, tableNumber: this.paramsObject.params.selectedTable };
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(OrderTrackerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(orderPlaced => {
      this.orderPlaced = orderPlaced;
    });
  }

  /**
   * Navigates to the home page via a router.
   */
  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  /**
   * Selects a category and calls findCategoryItems() to filter the menu
   * by the selected category.
   * @param category 
   */
  selectCategory(category: MenuCategory): void {
    this.selectedCategory = category;
    this.findCategoryItems();
  }

  /**
   * Forms a string with the allergens present in a menu item.
   * 
   * @param item the menu item
   * @returns a string with all the allergens
   */
  allergensArray(item: Menu): Array<String> {
    var allergyArray: Array<String> = []
    if (item.peanuts == true) {
      allergyArray.push("Peanuts");
    }
    if (item.celery == true) {
      allergyArray.push("Celery");
    }
    if (item.gluten == true) {
      allergyArray.push("Gluten");
    }
    if (item.crustaceans == true) {
      allergyArray.push("Crustaceans");
    }
    if (item.eggs == true) {
      allergyArray.push("Eggs");
    }
    if (item.fish == true) {
      allergyArray.push("Fish");
    }
    if (item.lupin == true) {
      allergyArray.push("Lupin");
    }
    if (item.milk == true) {
      allergyArray.push("Milk");
    }
    if (item.molluscs == true) {
      allergyArray.push("Molluscs");
    }
    if (item.mustard == true) {
      allergyArray.push("Mustard");
    }
    if (item.nuts == true) {
      allergyArray.push("Nuts");
    }
    if (item.soya == true) {
      allergyArray.push("Soya");
    }
    if (item.sesameSeeds == true) {
      allergyArray.push("Sesame Seeds");
    }
    if (item.sulphites == true) {
      allergyArray.push("Sulphites");
    }
    return allergyArray;
  }
}
