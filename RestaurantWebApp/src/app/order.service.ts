import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, TimeInterval} from 'rxjs';
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
  private orderSubject$ = new BehaviorSubject<Order[]>(new Array<Order>());
  // orders$ = this.orderSubject$.asObservable();

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Order[]> {
    return this.orderSubject$.asObservable();
  }

  public getUpdatedOrders(): void {
    this.httpClient.get<Order[]>(this.restaurantWebApiUrl)
      .subscribe((orders) => {
        this.orderSubject$.next(orders);
      });
  }

  public getOrders(): Observable<Order[]> {
    return this.list();
  }

  createNewOrder(): Observable<Order> {
    return this.httpClient.post<Order>(this.restaurantWebApiUrl,new Order(),this.httpOptions)
      .pipe(
        tap(this.orderSubject$.next())
      );
  }

  getOrderById(mealId: number): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.mealsURL}/${mealId}`)
      .pipe(
        map(response => response)
      );
  }

  deleteOrderById(orderId: number): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.restaurantWebApiUrl}/${orderId}`).pipe(
      tap(()=>{
        console.log(`${orderId} has been cancelled`);
        this._refreshNeeded.next();
      }) );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}`,order)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      )
  }
}
