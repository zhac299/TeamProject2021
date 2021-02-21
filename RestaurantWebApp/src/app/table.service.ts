import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Table} from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  restaurantTablesURL = 'http://localhost:8080/api/v1/tables';

  constructor(private httpClient: HttpClient) { }

  public getTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.restaurantTablesURL)
      .pipe(
        map(response => response)
      );
  }

  public getTable(id: number): Observable<Table> {
    return this.httpClient.get<Table>(`${this.restaurantTablesURL}/${id}`)
      .pipe(
        map(response => response)
      );
  }
}
