import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { MenuCategory } from '../models/MenuCategory';
import {exhaustMap, share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

/**
 * The class that handles the requests for the menu category DB.
 */
export class MenuCategoryService {

  /**
   * The URL link that is used to make requests to the DB.
   */
  menuCategoryURL = "http://localhost:8080/api/v1/menuCategory";

  /**
   * A subject that can be called if new observables need to be emitted.
   */
  refresh$ = new BehaviorSubject(null);

  /**
   * The constructor of the class.
   * 
   * @param httpClient the http client that is used to make requests to the DB
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * A public observable that can be subscribed to by components.
   */
  categories$ = this.refresh$.pipe(
    exhaustMap(() => this.getMenuCategories()),
    share()
  );

  /**
   * Gets all the menu categories by making a get request to the DB.
   * 
   * @returns an observable of type Menucategory
   */
  public getMenuCategories(): Observable<MenuCategory[]> {
    return this.httpClient.get<MenuCategory[]>(this.menuCategoryURL);
  }

  /**
   * Gets menu category by id by making a get request to the DB.
   * 
   * @param id the id of the queried menu category
   * @returns an observale of type MenuCategory
   */
  public getMenuCategory(id: number): Observable<MenuCategory> {
    return this.httpClient.get<MenuCategory>(`${this.menuCategoryURL}/${id}`);
  }

  /**
   * Creates a new category by making a post request to the DB.
   * 
   * @param category the category to be added to the DB
   * @returns an observable of type MenuCategory
   */
  createNewCategory(category: MenuCategory): Observable<MenuCategory> {
    return this.httpClient.post<MenuCategory>(this.menuCategoryURL, category);
  }

  /**
   * Deletes a menu category by making a delete request to the DB.
   * 
   * @param category the category to be deleted
   * @returns an observable of type MenuCategory
   */
  deleteCategory(category: MenuCategory): Observable<MenuCategory> {
    return this.httpClient.delete<MenuCategory>(`${this.menuCategoryURL}/${category.id}`);
  }

  /**
   * Updates a menu category by making a put request to the DB.
   * 
   * @param category the category to be updated
   * @returns an observable of type MenuCategory
   */
  updateCategory(category: MenuCategory): Observable<MenuCategory> {
    return this.httpClient.put<MenuCategory>(`${this.menuCategoryURL}/${category.id}`,category);
  }
}
