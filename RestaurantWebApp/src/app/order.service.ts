import { Injectable } from '@angular/core';
import {Observable, Subject, TimeInterval} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Order} from '../models/Order';
import {map, tap} from 'rxjs/operators';
import {Menu} from "../models/Menu";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  mockDbUrl = 'http://localhost:3000/orders';
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/orders';
  mealsURL = 'http://localhost:8080/api/v1/meals';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private _refreshNeeded = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  // Making an Http request to the database
  public getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.restaurantWebApiUrl)
    .pipe(
      map(response => response)
    );
  }

  // public createOrder(): Observable<ArrayBuffer> {
  //   return this.httpClient.post(this.mockDbUrl);
  // }
  createNewOrder(): Observable<Order> {
    return this.httpClient.post<Order>(this.restaurantWebApiUrl,new Order(),this.httpOptions)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
        ,map(response => response)
      );
  }

  getOrderById(mealId: number): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.mealsURL}/${mealId}`)
      .pipe(
        map(response => response)
      );
  }
}
