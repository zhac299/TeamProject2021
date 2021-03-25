import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Staff} from '../models/Staff';
import { selectedCategory } from '../models/selectedCategory';
import {exhaustMap, map, repeat, share, tap} from "rxjs/operators";
import { Order } from '../models/Order';

/**
 * Service for create, read, update and delete staff in the Restaurant API
 */
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  /**
   * References if the manager accessed add staff dialog or edit staff dialog.
   */
  edit: boolean;

  /**
   * The constructor of the class.
   * 
   * @param httpClient the http client that is used to make requests
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * URL for staff in Api
   */
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/staff';

  refresh$ = new BehaviorSubject(null);

  staff$ = this.refresh$.pipe(
    exhaustMap(() => this.getStaffs()),
    share()
  );

  public getStaffByUsernameAndPassword(username: String, password: String): Observable<Staff> {
    return this.httpClient.get<Staff>(this.restaurantWebApiUrl + `/${username}/${password}`);
  }

  /**
   * Get all staff
   */
  public getStaffs(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>(this.restaurantWebApiUrl);
  }

  /**
   * Get staff by id
   * @param staffId id of staff
   */
  public getStaffById(staffId: number): Observable<Staff> {
     return this.httpClient.get<Staff>(`${this.restaurantWebApiUrl}/${staffId}`);
  }

  /**
   * Get sales of staff
   * @param id of staff
   */
  public getSales(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.restaurantWebApiUrl + '/getSales/'+id);
  }

  /**
   * Create new staff by post request
   * @param staff to create
   */
  createStaff(staff: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(this.restaurantWebApiUrl, staff);
  }

  /**
   * Update an existing staff member
   * @param staff to update
   */
  updateStaff(staff: Staff): Observable<Staff> {
    return this.httpClient.put<Staff>(this.restaurantWebApiUrl + '/'+staff.id, staff);
  }

  /**
   * Get's random waiter from all waiter staff
   */
  public getRandomWaiter(): Observable<Staff> {
    return this.httpClient.get<Staff>(this.restaurantWebApiUrl + '/randomwaiter')
  }

  public deleteStaff(staff: Staff): void{
    this.httpClient.delete(`${this.restaurantWebApiUrl}/${staff.id}`).subscribe()
  }
}
