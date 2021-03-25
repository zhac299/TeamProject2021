import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";
import {MatDialog} from "@angular/material/dialog";
import {AddMenuDialogComponent} from "../waiter-menu/add-menu-dialog/add-menu-dialog.component";
import {Subscription, timer} from "rxjs";
import {map, tap} from "rxjs/operators";
import { Router } from '@angular/router';
import {MenuCategoryService} from "../menu-category.service";
import {MenuCategory} from "../../models/MenuCategory";
import {CategoryDialogComponent} from "../category-dialog/category-dialog.component";
import {IngredientsDialogComponent} from "./ingredients-dialog/ingredients-dialog.component";

/**
 * A Menu list component that displays all menu items in a table
 */
@Component({
  selector: 'app-menus-list-display',
  templateUrl: './menus-list-display.component.html',
  styleUrls: ['./menus-list-display.component.sass']
})
export class MenusListDisplayComponent implements OnInit, OnDestroy {

  /**
   * Constructor tasked with instatiating the neccessary object to filter through the menu.
   * 
   * @param {MenuService} menuService The service associated with the main menu interface.
   * @param {CategoryService} categoryService The service associated with the category filter functionality.
   * @param {Router} router An object which helps route to different pages.
   * @param {MatDialog} dialog An object involved with creating pop-up panels for more user interaction. 
   */
  constructor(private menuService: MenuService,
              private categoryService: MenuCategoryService,
              private router: Router,
              public dialog: MatDialog) { }

  /**
   * Field to hold all menu categories
   */
  categories: MenuCategory[];

  /**
   * Field to hold all menu items
   */
  menuList: Menu[] = [];

  /**
   * A subscription that uses the timer to get new data from the API
   */
  subscription: Subscription;

  /**
   * A subscription that uses the timer to get new data from the API
   * for categories
   */
  catSubscription: Subscription;
  refreshTimer$ = timer(0, 1000);

    isAuth: boolean = true;
    
    /**
     * On initialisation, the menu filtering will be insatiated and returned to the user interface.
     */
  ngOnInit(): void {
    if(this.router.url === '/client-menu') {
      this.isAuth = false;
    }
    this.catSubscription = this.refreshTimer$.subscribe(this.categoryService.refresh$);
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    })
    this.subscription = this.refreshTimer$.subscribe(this.menuService.refresh$);
    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$
      .pipe(
        map((menus) => {
           menus.forEach((menu) => {
            this.menuService.getIngredients(menu.id)
              .subscribe((ingredients) => menu.ingredients= ingredients);
          });
           return menus;
        })
      )
      .subscribe((menus) => {
      this.menuList = menus;
    });
  }

  /**
   * Unsubscribes from timer
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /**
   * This method is tasked with opening a pop-up panel so staff and manager can edit the menu.
   * 
   * @param {Menu} menu Menu item subject to modification.
   */
  openEditMenuDialog(menu:Menu): void {

    this.menuService.getIngredients(menu.id).subscribe(ings => {
      menu.ingredients = [];
      ings.forEach(element => {
        menu.ingredients.push(element.ingredient.id);
      });
      const title = "Edit Dish";
      const hasMenuItem: boolean = true;
      const dialogRef = this.dialog.open(AddMenuDialogComponent, {
        data: {menu,title,hasMenuItem},
        width: '50%'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.menuService.update(result).subscribe();
          this.menuService.addIngredients(result.id, result.ingredients);
          this.refreshTimer$.subscribe();
        }
      });
    });
  }
  /**
   *  Method for deleting a menu item from the menu.
   * 
   * @param {Menu} menu Menu item subject for deletion.
   */
  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

  /**
   * Method for opening a pop-up display to edit a category.
   * 
   * @param {MenuCategory} category The category to be modified.
   */
  openEditCategoryDialog(category: MenuCategory) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: category
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.categoryService.updateCategory(result).subscribe();
    });
  }
  /**
   * Method for opening a pop-up display to delete a category.
   * 
   * @param {MenuCategory} category the category to be deleted by the staff member.
   */
  deleteCategoryItem(category: MenuCategory) {
    this.categoryService.deleteCategory(category).subscribe();
}

  /**
   * This method is purposed with opening a pop-up display so a staff member can add a category. 
   */
  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: new MenuCategory()
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.categoryService.createNewCategory(result).subscribe();
    });
  }
  /**
   * This method is purposed with opening a pop-up display so a staff member can edit ingredients.
   * 
   * @param {Menu} menu the object in which the method will modify.
   */
  openIngredientsDialog(menu: Menu) {
    this.dialog.open(IngredientsDialogComponent, {
      data: menu
    });
  }
}
