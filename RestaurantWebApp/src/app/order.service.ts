import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../models/Order';
import {map} from 'rxjs/operators';
import {Menu} from "../models/Menu";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  restaurantWebApiUrl = 'http://localhost:8080/api/v1/orders';
  mealsURL = 'http://localhost:8080/api/v1/meals';

  private orderSubject$ = new BehaviorSubject<Order[]>([]);
  orders$ = this.orderSubject$.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getUpdatedOrders(): void {
    this.httpClient.get<Order[]>(this.restaurantWebApiUrl)
      .subscribe((orders) => {
        this.orderSubject$.next(orders);
      });
  }

  // fetchOrders(): Order[] {
  //   let orderList: Order[] = [];
  //   this.httpClient.post<Order[]>(this.restaurantWebApiUrl,new Order())
  //     .subscribe((orders) => {
  //       orderList = orders;
  //     });
  //   return orderList;
  // }

  createNewOrder(): void {
    this.httpClient.post<Order[]>(this.restaurantWebApiUrl,new Order())
      .subscribe((orders) => {
        this.orderSubject$.next(orders);
        this.getUpdatedOrders();
      });
  }

  getOrderById(mealId: number): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.mealsURL}/${mealId}`)
      .pipe(
        map(response => response)
      );
  }

  deleteOrderById(orderId: number): void {
    this.httpClient.delete<Order>(`${this.restaurantWebApiUrl}/${orderId}`)
      .subscribe(() => {
        this.orderSubject$.next(
          this.orderSubject$.getValue()
            .filter(
              (ignoreOrder) =>
                ignoreOrder.id !== orderId

            )
        );
      });
  }

  updateOrder(order: Order): void {
    this.httpClient.put<Order[]>(`${this.restaurantWebApiUrl}/${order.id}`,order)
      .subscribe((orders) => {
        this.orderSubject$.next(orders);
      });
  }
}
