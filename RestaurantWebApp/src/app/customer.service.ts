import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Customer} from "../models/Customer";
import {Table} from "../models/Table";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * The class that handles requests for the Customer DB.
 */
export class CustomerService {

  /**
   * The URL link that is used to make the requests to the DB.
   */
  readonly restaurantWebApiUrl = 'http://localhost:8080/api/v1/customer';

  /**
   * A refresh needed subject that ensures info from the DB is refreshed
   */
  private _refreshNeeded$ = new Subject<void>();

  /**
   * Returns the refresh needed subject.
   */
  get refreshNeeded() {
    return this._refreshNeeded$;
  }

  /**
   * The constructor of the class.
   * 
   * @param httpClient the http client that is used to make requests
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Makes a get request to the DB to get all the customers in the DB.
   * 
   * @returns an Observable of type Customer[]
   */
  public getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.restaurantWebApiUrl);
  }

  /**
   * Creates a new Customer by making a post request to the Customer DB.
   * 
   * @param customer the customer object to be added to the DB
   * @returns an observable of type Customer
   */
  public createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.restaurantWebApiUrl, customer);
  }

  /**
   * Creates a new customer with a table by making a post request to the DB.
   * 
   * @param table the table 
   * @returns an observable of type Customer
   */
  public createCustomerWithTable(table: Table): Observable<Customer> {
    const newCustomer = new Customer();
    newCustomer.table = table;
    return this.httpClient.post<Customer>(this.restaurantWebApiUrl, newCustomer);
  }

  /**
   * Updates a customer in the DB by making a put request to the DB.
   * 
   * @param customer the customer to be updated
   * @returns an observable of type Customer
   */
  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.restaurantWebApiUrl, customer);
  }

  /**
   * Deletes a customer in the DB by making a delete request to the DB.
   * 
   * @param customer the customer to by deleted
   */
  public deleteCustomer(customer: Customer): void {
    this.httpClient.delete(`${this.restaurantWebApiUrl}/${customer.id}`);
  }

  /**
   * Gets a customer by ID from the DB by making a get request to the DB.
   * 
   * @param id the id of the customer in the DB
   * @returns an observable of type Customer
   */
  public getCustomerByID(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.restaurantWebApiUrl}/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

}
