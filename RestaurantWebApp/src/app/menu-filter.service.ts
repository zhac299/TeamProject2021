import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Menu } from '../models/Menu';
import {MenuCategory} from "../models/MenuCategory";

@Injectable({
  providedIn: 'root'
})

/**
 * The class that handles requests for the Menu Filter Service.
 */
export class MenuFilterService {

  /**
   * The URL link that is used to make filter menu requests to the DB.
   */
  filteredDB = 'http://localhost:8080/api/v1/menu/filter';

  /**
   * The URL link that is used to make category requests to the DB.
   */
  menuCategoryUrl = 'http://localhost:8080/api/v1/menuCategory'

  /**
   * A subject that can be called if new observables need to be emitted.
   */
  private _refreshNeeded = new Subject<void>();

  /**
   * The constructor of the class. 
   * 
   * @param httpClient the http client that is used to make requests to the DB
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Gets the private refresh needed subject.
   */
  get refreshNeeded() {
    return this._refreshNeeded;
  }

  /**
   * Filters the menu by the passed arguments (calories and allergens) by
   * making a requst to the DB.
   * 
   * @param val the filter args
   * @returns an observable of type Menu[]
   */
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
