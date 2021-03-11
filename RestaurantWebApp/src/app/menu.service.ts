import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Menu} from '../models/Menu';
import { selectedCategory } from 'src/models/selectedCategory';
import {Order} from "../models/Order";
import {map, repeat} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  mockDbUrl = 'http://localhost:3000/menu';
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/menu';
  orderList: Menu[] = [];
  sOrder: Menu[] = [];
  cat: selectedCategory = new selectedCategory;

  private readonly menuSubject = new BehaviorSubject<Menu[]>(new Array<Menu>());
  readonly menus$ = this.menuSubject.asObservable();

  private getMllenus(): Menu[] {
    return this.menuSubject.getValue();
  }

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
    this.httpClient.post<Menu>(this.restaurantWebApiUrl, menu)
      .subscribe((menu) => {
        const currentList = this.menuSubject.getValue()
        currentList.push(menu)
        this.menuSubject.next(currentList);
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

    // Filter methods for filtering by dish.
    getCat(): selectedCategory {
        if (Object.keys(this.cat).length === 0) {
            this.createSelectedCat();
        }
        return this.cat;
    }

    createSelectedCat(): selectedCategory {
        this.httpClient.get<Menu[]>(this.restaurantWebApiUrl).subscribe( orders => {
            this.orderList = orders;
            for (let order of this.orderList) {
                if (order.category == "Fajita"&& order.isSuggested == "no") {
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
                if (order.category == newCat && order.isSuggested == "no") {
                    this.sOrder.push(order);
                }
            }
        });
        this.cat.meal = this.sOrder;
        return this.cat;
    }
    showSuggestions() {
        this.httpClient.get<Menu[]>(this.restaurantWebApiUrl).subscribe( orders => {
            this.orderList = orders;
            for (let order of this.orderList) {
                if (order.category == this.cat.name && order.isSuggested == "yes") {
                    this.sOrder.push(order);
                }
            }
        });
    }

    setCat(menu: Menu[]) {
        this.sOrder = [];
        for (let order of menu) {
            if (order.category == this.cat.name && order.isSuggested == "no") {
                this.sOrder.push(order);
            }
        }
        this.cat.meal = this.sOrder;
    }
}
