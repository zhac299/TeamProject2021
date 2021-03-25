import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Menu } from '../models/Menu';
import { selectedCategory } from '../models/selectedCategory';
import { Order } from "../models/Order";
import { exhaustMap, map, repeat, share } from "rxjs/operators";
import {Ingredient} from "../models/Ingredient";

/**
 * Service to fetch Menu's from the Restaurant API
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {


  /**
   * URL for menu's in the Restaurant Api
   */
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/menu';

  sOrder: Menu[] = [];
  copyOrder: Menu[] = [];

  /**
   * Subject for menus that can be changed reactively
   * @private
   */
  private readonly menuSubject = new BehaviorSubject<Menu[]>(new Array<Menu>());
  refresh$ = new BehaviorSubject(null);

  /**
   * Sends get request for menus
   */
  public getMenus(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.restaurantWebApiUrl);
  }

  /**
   * Public menus observable that can be subscribed to by components
   */
  menus$ = this.refresh$.pipe(
    exhaustMap(() => this.getMenus()),
    share()
  );

  /**
   * Sets new menus value for menu Subject
   * @param menus
   * @private
   */
  private setMenus(menus: Menu[]) {
    this.menuSubject.next(menus);
  }

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Gets updaeted menu list by calling new get request
   */
  getAllUpdatedMenus(): void {
    this.httpClient.get<Menu[]>(this.restaurantWebApiUrl)
      .subscribe((menuList) => {
        this.menuSubject.next(menuList);
      });
  }

  /**
   * Get menu by id
   * @param id of menu
   */
  public getMenuById(id: number): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.restaurantWebApiUrl}/${id}`);
  }

  /**
   * Create new menu by post request
   * @param menu to post to api
   */
  createMenuItem(menu: Menu): void {
    let ingredients = menu.ingredients;
    this.httpClient.post<Menu>(this.restaurantWebApiUrl, menu)
      .subscribe((menu) => {

        this.addIngredients(menu.id, ingredients);
        const currentList = this.menuSubject.getValue()
        currentList.push(menu)
        this.menuSubject.next(currentList);
        this.getAllUpdatedMenus();
      });
  }

  addIngredients(id: number, ingredients: Ingredient[]): void {
    console.log(ingredients);
    this.httpClient.get<Menu>(this.restaurantWebApiUrl + '/ingredients?id=' + id + '&ingredients=' + ingredients)
      .subscribe((menuList) => {
      });
  }

  /**
   * Get ingredients of menu item
   * @param id of menu
   */
  getIngredients(id: number): Observable<any> {
    return this.httpClient.get<any>(this.restaurantWebApiUrl + '/getIngredients?id=' + id);
  }

  /**
   * Deletes a menu item
   * @param menu item to delete
   */
  deleteMenu(menu: Menu): void {
    this.httpClient.delete<Menu>(`${this.restaurantWebApiUrl}/${menu.id}`)
      .subscribe((menu) => {
        this.menuSubject.next(
          this.menuSubject.getValue()
            .filter(
              (ignoreMenu) =>
                ignoreMenu !== menu
            )
        );
        this.getAllUpdatedMenus();
      });
  }

  /**
   * Updates a menu item
   * @param menu item to update
   */
  updateMenu(menu: Menu): void {
    this.httpClient.put<Menu[]>(`${this.restaurantWebApiUrl}/${menu.id}`, menu)
      .subscribe((menuList) => {
        this.menuSubject.next(menuList);
        this.getAllUpdatedMenus();
      });
  }

  /**
   * Put request for menu item
   * @param menu to use in put request
   */
  update(menu: Menu): Observable<Menu> {
    return this.httpClient.put<Menu>(`${this.restaurantWebApiUrl}/${menu.id}`, menu);
  }
}
