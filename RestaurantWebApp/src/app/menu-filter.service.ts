import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Meal } from 'src/models/Meal';

@Injectable({
  providedIn: 'root'
})
export class MenuFilterService {

  filteredDB = 'http://localhost:8080/api/v1/menu/filter';
  private _refreshNeeded = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refreshNeeded() {
    return this._refreshNeeded;
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
