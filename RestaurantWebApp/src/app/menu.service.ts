import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Menu} from '../models/Menu';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  mockDbUrl = 'http://localhost:3000/menu';
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/menu';

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
}
