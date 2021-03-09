import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Staff} from '../models/Staff';
import { selectedCategory } from 'src/models/selectedCategory';
import {exhaustMap, map, repeat, share} from "rxjs/operators";

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

  public getStaffById(id: number): Observable<Staff>{
    return this.httpClient.get<Staff>(`${this.restaurantWebApiUrl}/${id}`);
  }
}
