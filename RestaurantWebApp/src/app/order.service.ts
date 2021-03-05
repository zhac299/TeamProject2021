import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/Order';
import {exhaustMap, share, tap} from 'rxjs/operators';
import {Menu} from "../models/Menu";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  restaurantWebApiUrl = 'http://localhost:8080/api/v1/orders';
  mealsURL = 'http://localhost:8080/api/v1/meals';

  private _refreshNeeded = new Subject<void>();

  orderSubject$ = new BehaviorSubject<Order[]>([]);
  refresh$ = new BehaviorSubject(null);

  orders$ = this.refresh$.pipe(
    exhaustMap( () => this.getOrders()),
    share()
  );

  constructor(private httpClient: HttpClient) {
    console.log('Instance created');
  }

  public getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.restaurantWebApiUrl);
  }

  public getUpdatedOrders(): void {
    this.httpClient.get<Order[]>(this.restaurantWebApiUrl)
      .subscribe((orders) => {
        this.orderSubject$.next(orders);
      });
  }

  public _getUpdatedOrders(): void {
    this.httpClient.get<Order[]>(this.restaurantWebApiUrl)
      .subscribe((orders) => {
        this.orderSubject$.next(orders);
      });
  }

  createNewOrderWithCustomer(customer: Customer): void {
    const orderWithCustomer = new Order();
    orderWithCustomer.customer = customer;
    this.httpClient.post<Order>(this.restaurantWebApiUrl, orderWithCustomer)
      .subscribe((order) => {
        const _orders = this.orderSubject$.getValue();
        _orders.push(order);
        this.orderSubject$.next(
          _orders
        );
        this.getUpdatedOrders();
      });
  }

  createNewOrder(customer: Customer): Observable<Order> {
    const orderWithCustomer = new Order();
    orderWithCustomer.customer = customer;
    return this.httpClient.post<Order>(this.restaurantWebApiUrl, orderWithCustomer);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.refresh$.pipe(
      exhaustMap( () =>
        this.httpClient.get<Order>(`${this.restaurantWebApiUrl}/${orderId}`)
          )
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

  updateOrderDelivered(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isdelivered/${order.isDelivered}`,order);
  }

  updateOrderConfirmed(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isconfirmed/${order.isConfirmed}`,order);
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

  public getOrderedMenuItems(order: Order): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.restaurantWebApiUrl}/${order.id}/orderedMenuItems`);
  }

  public updateOrderIsDelivered(order: Order, newIsDelivered: boolean): Observable<Order> {
    let restaurantOrderIsDeliveredURL: string = this.restaurantWebApiUrl + '/' + order.id + '/isdelivered';
    order.isDelivered = newIsDelivered;
    return this.httpClient.put<Order>(`${restaurantOrderIsDeliveredURL}/${newIsDelivered.valueOf()}`, order)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      )
  }

  public updateOrderIsConfirmed(order: Order, newIsConfirmed: boolean): Observable<Order> {
    let restaurantOrderIsConfirmedURL: string = this.restaurantWebApiUrl + '/' + order.id + '/isconfirmed';
    order.isConfirmed = newIsConfirmed;
    return this.httpClient.put<Order>(`${restaurantOrderIsConfirmedURL}/${newIsConfirmed.valueOf()}`, order)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      )
  }

  public getConfirmedOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.restaurantWebApiUrl}/isconfirmed`);
  }

  public getNoConfirmedOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.restaurantWebApiUrl}/noisconfirmed`);
  }

}
