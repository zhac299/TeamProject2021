import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Table} from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  mockDbUrl = 'http://localhost:3000/tables';

  constructor(private httpClient: HttpClient) { }

  // Making an Http request to the database
  public getTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.mockDbUrl)
      .pipe(
        map(response => response)
      );
  }

  public getTable(id: number): Observable<Table> {
    return this.httpClient.get<Table>(`${this.mockDbUrl}/${id}`)
      .pipe(
        map(response => response)
      );
  }
}
