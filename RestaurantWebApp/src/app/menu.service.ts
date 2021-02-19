import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Menu} from '../models/Menu';
import { selectedCategory } from 'src/models/selectedCategory';
import {Order} from "../models/Order";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  mockDbUrl = 'http://localhost:3000/menu';
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/menu';
  orderList: Menu[] = [];
  sOrder: Menu[] = [];
  cat: selectedCategory = new selectedCategory;

  private menuSubject = new BehaviorSubject<Menu[]>(new Array<Menu>());
  menus$ = this.menuSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

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
    this.httpClient.post<Menu[]>(this.restaurantWebApiUrl, menu)
      .subscribe((menuList) => {
        this.menuSubject.next(menuList);
        this.getAllUpdatedMenus();
      });
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

  // deleteMenu(menu: Menu): Observable<Menu>{
  //   return this.httpClient.delete<Menu>(`${this.restaurantWebApiUrl}/${menu.id}`)
  //     .pipe(
  //       tap(()=> {
  //         this._refreshNeeded.next();
  //       })
  //     );
  // }
  //
  // createMenuItem(menu: Menu): Observable<Menu> {
  //   return this.httpClient.post<Menu>(this.restaurantWebApiUrl,menu)
  //     .pipe(
  //       tap(() => {
  //         this.refreshNeeded.next();
  //       })
  //     );
  //   }

    // Filter methods for filtering by dish.
    getCat(): selectedCategory {
        if (Object.keys(this.cat).length === 0) {
            this.createSelectedCat();
        }
        return this.cat;
    }

    createSelectedCat(): selectedCategory {
        this.menus$.subscribe( orders => {
            this.orderList = orders;

            for (let order of this.orderList) {
                if (order.category == "Fajita") {
                    this.sOrder.push(order);
                }
            }

            this.cat.name = "Fajita";
            this.cat.meal = this.sOrder;

        });
        return this.cat;
    }

    modifyCat(newCat: string): selectedCategory {
        this.sOrder = [];
        this.cat.name = newCat;
        this.menus$.subscribe(orders => {
            this.orderList = orders;
            for (let order of this.orderList) {
                if (order.category == newCat) {
                    this.sOrder.push(order);
                }
            }
        });
        this.cat.meal = this.sOrder;
        return this.cat;
    }

    setCat(menu: Menu[]) {
        this.sOrder = [];
        for (let order of menu) {
            if (order.category == this.cat.name) {
                this.sOrder.push(order);
            }
        }
        this.cat.meal = this.sOrder;
    }

  findMealFromMenu(data: Order): Observable<Menu[]> {
    let menus: Menu[] = [];
    if (data.meal.length > 0 || data.meal != undefined) {
      data.meal.forEach(value => {
        this.getMenuById(value.menu_id)
          .subscribe((menu) => {
            menus.push(menu)
          })
      });
    }
    return of(menus);
  }
}
