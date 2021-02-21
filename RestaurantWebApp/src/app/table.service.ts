import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { Table} from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  restaurantTablesURL = 'http://localhost:8080/api/v1/tables';
  restaurantTablesNeedHelpURL = 'http://localhost:8080/api/v1/tables/needHelp';
  restaurantTablesUnoccupiedURL = 'http://localhost:8080/api/v1/tables/unoccupied';

  private _refreshNeeded = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  public getTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.restaurantTablesURL)
      .pipe(
        map(response => response)
      );
  }

  public getTableByNumber(id: number): Observable<Table> {
    return this.httpClient.get<Table>(`${this.restaurantTablesURL}/${id}`)
      .pipe(
        map(response => response)
      );
  }

  public getUnoccupiedTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.restaurantTablesUnoccupiedURL)
      .pipe(
        map(response => response)
      );
  }

  public getNeedHelpTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.restaurantTablesNeedHelpURL)
      .pipe(
        map(response => response)
      );
  }

  public deleteTable(table: Table): Observable<Table>{
    return this.httpClient.delete<Table>(`${this.restaurantTablesURL}/${table.tableNumber}`)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      );
  }

}
