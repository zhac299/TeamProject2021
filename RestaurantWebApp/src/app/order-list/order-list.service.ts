import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { Meal } from 'src/models/Meal';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  filteredDB = 'http://localhost:8080/api/v1/menu/filter';
  initialDB = 'http://localhost:8080/api/v1/menu';

  initialMeals: Meal[];
  filteredMeals: Meal[];

  private _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  constructor(
    private httpClient: HttpClient) { }

  public setUp(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(this.initialDB)
      .pipe(
        map(response => response)
      );
  }

  public filter(val: string): Observable<Meal[]> {
    this.filteredDB = this.filteredDB.concat(val);
    let temp: string = this.filteredDB;
    this.filteredDB = 'http://localhost:8080/api/v1/menu/filter';

    return this.httpClient.get<Meal[]>(temp)
    .pipe(
      tap(()=> {
        this._refreshNeeded.next();
      })
      ,map(response => response)
    )
  }
}
