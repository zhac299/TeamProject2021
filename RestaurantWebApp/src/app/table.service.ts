import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {exhaustMap, map, share, tap} from 'rxjs/operators';

import { Table} from '../models/Table';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private restaurantTablesURL = 'http://localhost:8080/api/v1/tables';
  private _refreshNeeded = new Subject<void>();

  private readonly tableSubject$ = new BehaviorSubject<Table[]>(new Array<Table>());
  // get tables$() {
  //   return this.tableSubject$.asObservable();
  // }

  public getRefreshNeeded () {
    return this._refreshNeeded;
  }

  refresh$ = new BehaviorSubject(null);

  tables$ = this.refresh$.pipe(
    exhaustMap( () => this.getTables()),
    share()
  );

  constructor(private httpClient: HttpClient) { }

  public getTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.restaurantTablesURL)
      .pipe(
        map(response => response)
      );
  }

  public getUpdatedTables(): void {
    this.httpClient.get<Table[]>(this.restaurantTablesURL)
      .subscribe((tables) => {
        this.tableSubject$.next(tables);
      });
  }

  public getTableByNumber(id: number): Observable<Table> {
    return this.httpClient.get<Table>(`${this.restaurantTablesURL}/${id}`)
      .pipe(
        map(response => response)
      );
  }

  public updateTable(table: Table): Observable<Table> {
    return this.httpClient.put<Table>(`${this.restaurantTablesURL}/${table.tableNumber}`, table)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
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
    let restaurantTablesNeedHelpURL: string = this.restaurantTablesURL + '/updateNeedsHelp';
    table.needsHelp = true;
    return this.httpClient.put<Table>(`${restaurantTablesNeedHelpURL}/${newNeedsHelp.valueOf()}`, table)
      .pipe(
        tap(()=> {
          this._refreshNeeded.next();
        })
      )
  }

  public updateRestaurantTableReadyToOrder(table: Table, newisReady: boolean): Observable<Table> {
    let restaurantTablesIsReadyURL: string = this.restaurantTablesURL + '/updateNeedsHelp';
    table.needsHelp = true;
    return this.httpClient.put<Table>(`${restaurantTablesIsReadyURL}/${newisReady.valueOf()}`, table)
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

  public createTable():Observable<Table> {
    const newTable = new Table;
    newTable.isOccupied = false;
    newTable.isReady = false;
    newTable.needsHelp = false;
    return this.httpClient.post<Table>(this.restaurantTablesURL, newTable);
  }

  public assignTable(table: Table): Observable<Table> {
    return this.httpClient.post<Table>(this.restaurantTablesURL + '/assignTable', table);
  }

}
