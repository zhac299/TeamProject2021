import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Menu} from '../models/Menu';
import {map, tap} from 'rxjs/operators';
import { MenuPositionY } from "@angular/material/menu";
import { selectedCategory } from 'src/models/selectedCategory';
import { Meal } from 'src/models/Meal';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  mockDbUrl = 'http://localhost:3000/menu';
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/menu';
  orderList: Menu[] = [];  
  sOrder: Menu[] = [];
  cat: selectedCategory = new selectedCategory; 

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private _refreshNeeded = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  public getMenu(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.restaurantWebApiUrl)
      .pipe(
        map(response => response)
      );
  }
  public getMenuById(id: number): Observable<Menu>{
    return this.httpClient.get<Menu>(`${this.restaurantWebApiUrl}/${id}`)
      .pipe(
        map(response => response)
      );
  }

  updateMenu(menu: Menu) {
    return this.httpClient.put<Menu>(`${this.restaurantWebApiUrl}/${menu.id}`,menu)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        }),
        map(response=> response)
      );
  }

  deleteMenu(menu: Menu): Observable<Menu>{
    return this.httpClient.delete<Menu>(`${this.restaurantWebApiUrl}/${menu.id}`)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      );
  }

  createMenuItem(menu: Menu): Observable<Menu> {
    return this.httpClient.post<Menu>(this.restaurantWebApiUrl,menu)
      .pipe(
        tap(() => {
          this.refreshNeeded.next();
        })
      );
    }
    
    // Filter methods for filtering by dish.
    getCat(): selectedCategory {     
        if (Object.keys(this.cat).length === 0) {
            this.createSelectedCat();
        }
        return this.cat;
    }

    createSelectedCat(): selectedCategory {
        this.getMenu().subscribe( orders => {
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
        this.getMenu().subscribe(orders => {
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
    
}
