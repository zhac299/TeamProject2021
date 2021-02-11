import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../models/Menu';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  mockDbUrl = 'http://localhost:3000/menu';
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/menu';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

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
        map(response=> response)
      );
  }

  deleteMenu(menu: Menu): Observable<Menu>{
    return this.httpClient.delete<Menu>(`${this.restaurantWebApiUrl}/${menu.id}`);
  }
}
