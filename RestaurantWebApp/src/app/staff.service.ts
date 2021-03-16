import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Staff} from '../models/Staff';
import { selectedCategory } from 'src/models/selectedCategory';
import {exhaustMap, map, repeat, share} from "rxjs/operators";
import { Order } from 'src/models/Order';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient: HttpClient) {
    console.log('Instance created');
  }

  restaurantWebApiUrl = 'http://localhost:8080/api/v1/staff';

  public getStaffs(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>(this.restaurantWebApiUrl);
  }

  public getSales(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.restaurantWebApiUrl + '/getSales/'+id);
  }

  createStaff(staff: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(this.restaurantWebApiUrl, staff);
  }

  updateStaff(staff: Staff): Observable<Staff> {
    return this.httpClient.put<Staff>(this.restaurantWebApiUrl + '/'+staff.id, staff);
  }
}
