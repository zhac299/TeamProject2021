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

  categories: MenuCategory[];
  menuList: Menu[] = [];
  subscription: Subscription;
  catSubscription: Subscription;
  refreshTimer$ = timer(0, 1000)
    .pipe(tap());

  isAuth: boolean = true;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  deleteMenuItem(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }

  openEditCategoryDialog(category: MenuCategory) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: category
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.categoryService.updateCategory(result).subscribe();
    });
  }

  deleteCategoryItem(category: MenuCategory) {
    this.categoryService.deleteCategory(category).subscribe();
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: new MenuCategory()
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.categoryService.createNewCategory(result).subscribe();
    });
  }

  openIngredientsDialog(menu: Menu) {
    this.dialog.open(IngredientsDialogComponent, {
      data: menu
    });
  }
}
