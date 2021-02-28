import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/Order';
import {map} from 'rxjs/operators';
import {Menu} from "../models/Menu";
import {Customer} from "../models/Customer";
import { Meal } from 'src/models/Meal';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  restaurantWebApiUrl = 'http://localhost:8080/api/v1/orders';
  mealsURL = 'http://localhost:8080/api/v1/meals';

  private orderSubject$ = new BehaviorSubject<Order[]>([]);

  get orders$() {
    return this.orderSubject$.asObservable();
  }

  constructor(private httpClient: HttpClient) {
    console.log('Instance created');
  }

  public getUpdatedOrders(): void {
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

  createNewOrderWithCustomerAndMealList(customer: Customer, selectedMeals: Meal[]): void {
    const order = new Order();
    order.customer = customer;
    order.meal = selectedMeals;
    console.log(order);
    this.httpClient.post<Order>(this.restaurantWebApiUrl, order)
      .subscribe((order) => {
        const _orders = this.orderSubject$.getValue();
        _orders.push(order);
        this.orderSubject$.next(
          _orders
        );
        this.getUpdatedOrders();
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

  public getOrderedMenuItems(order: Order): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.restaurantWebApiUrl}/${order.id}/orderedMenuItems`);
  }

}
