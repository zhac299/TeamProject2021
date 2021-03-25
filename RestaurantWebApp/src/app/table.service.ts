import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { exhaustMap, map, share, tap } from 'rxjs/operators';

import { Table } from '../models/Table';
import { BehaviorSubject } from 'rxjs';
import { Staff } from '../models/Staff';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private restaurantTablesURL = 'http://localhost:8080/api/v1/tables';

  public currentStaff: number;

  private readonly tableSubject$ = new BehaviorSubject<Table[]>(new Array<Table>());

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded$;
  }

  refresh$ = new BehaviorSubject(null);

  tables$ = this.refresh$.pipe(
    exhaustMap(() => this.getTables()),
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
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
  }

  public updateTable(table: Table): void {
    this.httpClient.put<Table>(`${this.restaurantTablesURL}/${table.tableNumber}`, table)
    .subscribe((table) => {
      let _orders = this.tableSubject$.getValue();
      _orders.forEach((whichTable) => {
        if (whichTable.tableNumber == table.tableNumber) {
          whichTable = table;
        }
      });
      this.tableSubject$.next(_orders);
    })
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

  public deleteTable(table: Table): Observable<Table> {
    return this.httpClient.delete<Table>(`${this.restaurantTablesURL}/${table.tableNumber}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  public createTable(): Observable<Table> {
    const newTable = new Table;
    newTable.isOccupied = false;
    newTable.isReady = false;
    newTable.needsHelp = false;
    newTable.waiterId = this.currentStaff;
    return this.httpClient.post<Table>(this.restaurantTablesURL, newTable);
  }

  public assignTable(table: Table): Observable<Table> {
    return this.httpClient.post<Table>(this.restaurantTablesURL + '/assignTable', table);
  }

  public managerAssignTable(table: Table, staffId: number): Observable<Table> {
    return this.httpClient.put<Table>(this.restaurantTablesURL + `/manager/assignTable/${staffId}/${table.tableNumber}`, table);
  }
}
