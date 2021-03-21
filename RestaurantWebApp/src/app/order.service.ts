import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { exhaustMap, share, tap } from 'rxjs/operators';
import { Menu } from "../models/Menu";
import { Customer } from "../models/Customer";
import { StaffService } from './staff.service';
import { Staff } from '../models/Staff';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  restaurantWebApiUrl = 'http://localhost:8080/api/v1/orders';
  mealsURL = 'http://localhost:8080/api/v1/meals';

  private _refreshNeeded = new Subject<void>();

  public waiterId: number;

  orderSubject$ = new BehaviorSubject<Order[]>([]);
  refresh$ = new BehaviorSubject(null);

  orders$ = this.refresh$.pipe(
    exhaustMap(() => this.getOrders()),
    share()
  );

  constructor(private httpClient: HttpClient) {
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
    orderWithCustomer.isPaid = false;
    orderWithCustomer.total = 0;
    orderWithCustomer.waiterId = this.waiterId;
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

  createNewOrder(customer: Customer, total: number): Observable<Order> {
    const orderWithCustomer = new Order();
    orderWithCustomer.customer = customer;
    orderWithCustomer.total = total;
    orderWithCustomer.isPaid = false;
    return this.httpClient.post<Order>(this.restaurantWebApiUrl, orderWithCustomer);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.refresh$.pipe(
      exhaustMap(() =>
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
                ignoreOrder.id !== orderId)
        );
      });
  }

  updateOrderDelivered(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isdelivered/${order.isDelivered}`, order);
  }

  updateOrderConfirmed(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isconfirmed/${order.isConfirmed}`, order);
  }

  updateOrderReady(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isready/${order.isReady}`, order);
  }

  updateOrder(order: Order): void {
    this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}`, order)
      .subscribe((order) => {
        let _orders = this.orderSubject$.getValue();
        _orders.forEach((whichOrder) => {
          if (whichOrder.id == order.id) {
            whichOrder = order;
          }
        });
        this.orderSubject$.next(_orders);
      });
  }

  updateTotal(order: Order): void {
    let updateTotalUrl = this.restaurantWebApiUrl + "/total";
    this.httpClient.put<Order>(`${updateTotalUrl}/${order.id}/${order.total}`, order).subscribe((order) => {
      console.log(order);
    })
  }

  updateIsPaid(order: Order): void {
    let updateIsPaidUrl = this.restaurantWebApiUrl + "/isPaid";
    this.httpClient.put<Order>(`${updateIsPaidUrl}/${order.id}/${order.isPaid}`, order).subscribe((order) => {
      console.log(order);
    })
  }

  public getOrderedMenuItems(order: Order): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.restaurantWebApiUrl}/${order.id}/orderedMenuItems`);
  }

  public updateOrderIsDelivered(order: Order, newIsDelivered: boolean): Observable<Order> {
    let restaurantOrderIsDeliveredURL: string = this.restaurantWebApiUrl + '/' + order.id + '/isdelivered';
    order.isDelivered = newIsDelivered;
    return this.httpClient.put<Order>(`${restaurantOrderIsDeliveredURL}/${newIsDelivered.valueOf()}`, order)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      )
  }

  public updateOrderIsConfirmed(order: Order, newIsConfirmed: boolean): Observable<Order> {
    let restaurantOrderIsConfirmedURL: string = this.restaurantWebApiUrl + '/' + order.id + '/isconfirmed';
    order.isConfirmed = newIsConfirmed;
    return this.httpClient.put<Order>(`${restaurantOrderIsConfirmedURL}/${newIsConfirmed.valueOf()}`, order)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      )
  }

  public getNoConfirmedOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.restaurantWebApiUrl}/noisconfirmed`);
  }

  public getWaiterSpecificOrders(waiterId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.restaurantWebApiUrl}/waiterid/${waiterId}`);
  }

}
