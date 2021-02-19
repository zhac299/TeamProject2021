import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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

  createNewOrder(): void {
    this.httpClient.post<Order>(this.restaurantWebApiUrl,new Order())
      .subscribe((order) => {
        const _orders = this.orderSubject$.getValue();
        _orders.push(order);
        this.orderSubject$.next(
          _orders
        );
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
    this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}`,order)
      .subscribe((order) => {
        let _orders = this.orderSubject$.getValue();
        _orders.forEach((whichOrder) => {
          if(whichOrder.id == order.id) {
            whichOrder = order;
          }
        });
        this.orderSubject$.next(_orders);
      });
  }

  getOrderedMenuItems(order: Order): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.restaurantWebApiUrl}/${order.id}/orderedMenuItems`);
  }
}
