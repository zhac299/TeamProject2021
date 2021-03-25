import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { exhaustMap, share, tap } from 'rxjs/operators';
import { Menu } from "../models/Menu";
import { Customer } from "../models/Customer";

/**
 * Service that performs create, read, update, delete operations using the Restaurant Api
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  /**
   * URL for orders in the Api
   */
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/orders';

  /**
   * A subject that is called when a new request is needed.
   * @private
   */
  private _refreshNeeded = new Subject<void>();

  /**
   * Id for a waiter to get specified orders for a waiter.
   */
  public waiterId: number;

  /**
   * Helper Subject to store orders for state management.
   */
  orderSubject$ = new BehaviorSubject<Order[]>([]);

  /**
   * A subject that can be called if new observables need to be emitted.
   */
  refresh$ = new BehaviorSubject(null);

  /**
   * A public observable that can be subscribed to by components.
   */
  orders$ = this.refresh$.pipe(
    exhaustMap(() => this.getOrders()),
    share()
  );

  /**
   *
   * @param httpClient to perform http requests
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all orders from the Api.
   */
  public getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.restaurantWebApiUrl);
  }

  /**
   * Get updated orders by changing state of order subject.
   */
  public getUpdatedOrders(): void {
    this.httpClient.get<Order[]>(this.restaurantWebApiUrl)
      .subscribe((orders) => {
        this.orderSubject$.next(orders);
      });
  }

  /**
   * Creates a new order with an assigned new customer.
   * @param customer to assign to the new order
   */
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

  /**
   * Creates new order with a total initialised to zero.
   * @param customer to assign to order
   * @param total to add to order
   */
  createNewOrder(customer: Customer, total: number): Observable<Order> {
    const orderWithCustomer = new Order();
    orderWithCustomer.customer = customer;
    orderWithCustomer.total = total;
    orderWithCustomer.isPaid = false;
    return this.httpClient.post<Order>(this.restaurantWebApiUrl, orderWithCustomer);
  }

  /**
   * Gets an order by querying by Id.
   * @param orderId id of order
   */
  getOrderById(orderId: number): Observable<Order> {
    return this.refresh$.pipe(
      exhaustMap(() =>
        this.httpClient.get<Order>(`${this.restaurantWebApiUrl}/${orderId}`)
      )
    );
  }

  /**
   * Deletes an order by Id.
   * @param orderId belonging to order that needs to be deleted
   */
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

  /**
   * Update the isDelivered property of an order.
   * @param order to be updated
   */
  updateOrderDelivered(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isdelivered/${order.isDelivered}`, order);
  }

  /**
   * Update the isConfirmed property of an order.
   * @param order to be updated
   */
  updateOrderConfirmed(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isconfirmed/${order.isConfirmed}`, order);
  }

  /**
   * Update the isReady property of an order.
   * @param order to be updated
   */
  updateOrderReady(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.restaurantWebApiUrl}/${order.id}/isready/${order.isReady}`, order);
  }

  /**
   * Updates an order using a put request.
   * @param order to be updated
   */
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

  /**
   * Updates total of an order.
   * @param order to be updated
   */
  updateTotal(order: Order): void {
    let updateTotalUrl = this.restaurantWebApiUrl + "/total";
    this.httpClient.put<Order>(`${updateTotalUrl}/${order.id}/${order.total}`, order)
      .subscribe((order) => {
        let _orders = this.orderSubject$.getValue();
        _orders.forEach((whichOrder) => {
          if (whichOrder.id == order.id) {
            whichOrder = order;
          }
        });
        this.orderSubject$.next(_orders);
      })
  }

  /**
   * Updates isPaid property of order.
   * @param order to be updated
   */
  updateIsPaid(order: Order): void {
    let updateIsPaidUrl = this.restaurantWebApiUrl + "/isPaid";
    this.httpClient.put<Order>(`${updateIsPaidUrl}/${order.id}/${order.isPaid}`, order).subscribe((order) => {
      console.log(order);
    })
  }

  /**
   * Gets ordered menu items for an order.
   * @param order to get ordered items of
   */
  public getOrderedMenuItems(order: Order): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.restaurantWebApiUrl}/${order.id}/orderedMenuItems`);
  }

  /**
   * Updates isDelivered property of order.
   * @param order to be updated
   * @param newIsDelivered new value of isDelivered
   */
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

  /**
   * Updates isDelivered property of order.
   * @param order to be updated
   * @param newIsConfirmed new value of isConfirmed
   */
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

  /**
   * Get orders that have not been confirmed.
   */
  public getNoConfirmedOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.restaurantWebApiUrl}/noisconfirmed`);
  }

  /**
   * Get orders that have only been assigned to a waiter.
   * @param waiterId Id of waiter
   */
  public getWaiterSpecificOrders(waiterId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.restaurantWebApiUrl}/waiterid/${waiterId}`);
  }

}
