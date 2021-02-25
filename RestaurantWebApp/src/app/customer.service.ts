import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly restaurantWebApiUrl = 'http://localhost:8080/api/v1/customer';

  constructor(private httpClient: HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.restaurantWebApiUrl);
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.restaurantWebApiUrl, customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.restaurantWebApiUrl, customer);
  }

  public deleteCustomer(customer: Customer): void {
    this.httpClient.delete(`${this.restaurantWebApiUrl}/${customer.id}`);
  }

  public getCustomerByID(id: number): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.restaurantWebApiUrl}/${id}`)
  }

}
