import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Menu} from '../models/Menu';
import { selectedCategory } from 'src/models/selectedCategory';
import {Order} from "../models/Order";
import {exhaustMap, map, repeat, share} from "rxjs/operators";

/**
 * Service to fetch Menu's from the Restaurant API
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  mockDbUrl = 'http://localhost:3000/menu';
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/menu';
  orderList: Menu[] = [];
sOrder: Menu[] = [];
copyOrder: Menu[] = [];
  cat: selectedCategory = new selectedCategory;

  private readonly menuSubject = new BehaviorSubject<Menu[]>(new Array<Menu>());
  // readonly menus$ = this.menuSubject.asObservable();
  refresh$ = new BehaviorSubject(null);

  public getMenus(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.restaurantWebApiUrl);
  }
  menus$ = this.refresh$.pipe(
    exhaustMap( () => this.getMenus()),
    share()
  );

  private setMenus(menus: Menu[]) {
    this.menuSubject.next(menus);
  }

  constructor(private httpClient: HttpClient) {
    console.log('Instance created');
  }

  getAllUpdatedMenus(): void {
    this.httpClient.get<Menu[]>(this.restaurantWebApiUrl)
      .subscribe((menuList) => {
        this.menuSubject.next(menuList);
      });
  }

  public getMenuById(id: number): Observable<Menu>{
    return this.httpClient.get<Menu>(`${this.restaurantWebApiUrl}/${id}`);
  }

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

  addIngredients(id: number, ingredients: number[]): void {
    console.log(id)
    console.log(ingredients)
    this.httpClient.get<Menu>(this.restaurantWebApiUrl + '/ingredients?id='+id+'&ingredients='+ingredients)
    .subscribe((menuList) => {
    });
  }

  getIngredients(id: number): Observable<any> {
    return this.httpClient.get<any>(this.restaurantWebApiUrl + '/getIngredients?id='+id);
  }

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

  updateMenu(menu: Menu): void {
    this.httpClient.put<Menu[]>(`${this.restaurantWebApiUrl}/${menu.id}`,menu)
      .subscribe((menuList) => {
        this.menuSubject.next(menuList);
        this.getAllUpdatedMenus();
      });
  }

  update(menu: Menu): Observable<Menu> {
    return this.httpClient.put<Menu>(`${this.restaurantWebApiUrl}/${menu.id}`,menu);
  }
}
