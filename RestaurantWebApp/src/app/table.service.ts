import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { Table} from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private restaurantTablesURL = 'http://localhost:8080/api/v1/tables';
  private _refreshNeeded = new Subject<void>();

  public getRefreshNeeded () {
    return this._refreshNeeded;
  }

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
    let restaurantTablesUnoccupiedURL: string = this.restaurantTablesURL + '/unoccupied'
    return this.httpClient.get<Table[]>(restaurantTablesUnoccupiedURL)
      .pipe(
        map(response => response)
      );
  }

  public getNeedHelpTables(): Observable<Table[]> {
    let restaurantTablesNeedHelpURL: string = this.restaurantTablesURL + '/needHelp'
    return this.httpClient.get<Table[]>(restaurantTablesNeedHelpURL)
      .pipe(
        map(response => response)
      );
  }

  public updateRestaurantTableNeedsHelp(table: Table, newNeedsHelp: boolean): Observable<Table> {
    let restaurantTablesNeedHelpURL: string = this.restaurantTablesURL + '/updateNeedsHelp'
    return this.httpClient.put<Table>(`${restaurantTablesNeedHelpURL}/${newNeedsHelp}`,table)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      )
  }

  public updateRestaurantTableIsOccupied(table: Table, newIsOccupied: boolean): Observable<Table> {
    let restaurantTableIsOccupiedURL: string = this.restaurantTablesURL + '/updateIsOccupied'
    return this.httpClient.put<Table>(`${restaurantTableIsOccupiedURL}/${newIsOccupied}`,table)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      )
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
