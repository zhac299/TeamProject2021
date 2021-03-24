import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Staff} from '../models/Staff';
import { Order } from '../models/Order';

/**
 * Service for create, read, update and delete staff in the Restaurant API
 */
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * URL for staff in Api
   */
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/staff';

  /**
   * Get staff by username and password
   * @param username
   * @param password
   */
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
}
