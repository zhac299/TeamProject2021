import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../menu.service";
import {Menu} from "../../models/Menu";
import {MatDialog} from "@angular/material/dialog";
import {AddMenuDialogComponent} from "../waiter-menu/add-menu-dialog/add-menu-dialog.component";
import {Subscription, timer} from "rxjs";
import { Router } from '@angular/router';
import {MenuCategoryService} from "../menu-category.service";
import {MenuCategory} from "../../models/MenuCategory";
import {CategoryDialogComponent} from "../category-dialog/category-dialog.component";

/**
 * A Menu list component that displays all menu items in a table
 */
@Component({
  selector: 'app-menus-list-display',
  templateUrl: './menus-list-display.component.html',
  styleUrls: ['./menus-list-display.component.sass']
})
export class MenusListDisplayComponent implements OnInit, OnDestroy {


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

  /**
   * A refresh timer that ticks every second
   */
  refreshTimer$ = timer(0, 1000);

  // refreshTimer$ = timer(0, 5000)
  //   .pipe(tap(() => console.log('Fetching Menus...')));

  /**
   * Field to set if a staff is authorised to extra permissions or not
   */
  isAuth: boolean = true;

  /**
   * Initialises all menu items
   */
  ngOnInit(): void {
    if(this.router.url === '/client-menu') {
      this.isAuth = false;
    }
    // this.subscription = this.refreshTimer$.subscribe(this.menuService.refresh$);
    this.catSubscription = this.refreshTimer$.subscribe(this.categoryService.refresh$);
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    })
    // this.subscription = this.refreshTimer$.subscribe(this.menuService.refresh$);
    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
      this.menuList.forEach(element => {
        this.menuService.getIngredients(element.id).subscribe(ings => {
          element.ingredientsName = "";
          ings.forEach(name => {
            element.ingredientsName +=  name.ingredient.name+", ";
          });
          element.ingredientsName = element.ingredientsName.substring(0, element.ingredientsName.length-2);
        });
      });
    });
  }

  /**
   * Unsubscribes from timer
   */
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  /**
   * Opens edit dialog for menu
   * @param menu to edit
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
   * Deletes a menu item
   * @param menu
   */
  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

  /**
   * Opens edit category dialog and edits resulting category after changes
   * @param category to edit
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
   * Deletes a category item
   * @param category to delete
   */
  deleteCategoryItem(category: MenuCategory) {
    this.categoryService.deleteCategory(category).subscribe();
  }

  /**
   * Opens add category dialog to add a new category. Sends a post request after a non null
   * category is returned from the dialog
   */
  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: new MenuCategory()
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.categoryService.createNewCategory(result).subscribe();
    });
  }
}
