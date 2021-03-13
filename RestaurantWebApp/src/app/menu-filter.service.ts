import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Menu } from 'src/models/Menu';
import {MenuCategory} from "../models/MenuCategory";

@Injectable({
  providedIn: 'root'
})
export class MenuFilterService {

  filteredDB = 'http://localhost:8080/api/v1/menu/filter';
  menuCategoryUrl = 'http://localhost:8080/api/v1/menuCategory'

  private _refreshNeeded = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  public getMenuCategories(): Observable<MenuCategory[]> {
    return this.httpClient.get<MenuCategory[]>(this.menuCategoryUrl)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
        ,map(response => response)
      )
  }

  public getMenuCategory(id: number): Observable<MenuCategory> {
    return this.httpClient.get<MenuCategory>(`${this.menuCategoryUrl}/${id}`);
  }

  public filter(val: string): Observable<Menu[]> {
    this.filteredDB = this.filteredDB.concat(val);
    let temp: string = this.filteredDB;
    this.filteredDB = 'http://localhost:8080/api/v1/menu/filter';

    return this.httpClient.get<Menu[]>(temp)
    .pipe(
      tap(()=> {
        this._refreshNeeded.next();
      })
      ,map(response => response)
    )
  }
}
