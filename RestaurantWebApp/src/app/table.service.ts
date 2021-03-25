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

/**
 * The class that handles requests for the Table DB.
 */
export class TableService {

  /**
   * The URL link that is used to make requests to the DB.
   */
  private restaurantTablesURL = 'http://localhost:8080/api/v1/tables';

  /**
   * The current staff assigned to a table.
   */
  public currentStaff: number;

  /**
   * Helper Subject to store orders for state management.
   */
  private readonly tableSubject$ = new BehaviorSubject<Table[]>(new Array<Table>());

  /**
   * A subject that is called when a new request is needed.
   */
  private _refreshNeeded$ = new Subject<void>();

  /**
   * Gets the private class subject refresh needed
   */
  get refreshNeeded() {
    return this._refreshNeeded$;
  }

  /**
   * A subject that can be called if new observables need to be emitted.
   */
  refresh$ = new BehaviorSubject(null);

  /**
   * A public observable that can be subscribed to by components.
   */
  tables$ = this.refresh$.pipe(
    exhaustMap(() => this.getTables()),
    share()
  );

  /**
   * The constructor of the class.
   * 
   * @param httpClient the http client that is used to make requests to the DB
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Gets all the tables by making a get request to the DB.
   * 
   * @returns an observable of type Table[]
   */
  public getTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.restaurantTablesURL)
      .pipe(
        map(response => response)
      );
  }

  /**
   * Gets all updated tables (by the subject).
   */
  public getUpdatedTables(): void {
    this.httpClient.get<Table[]>(this.restaurantTablesURL)
      .subscribe((tables) => {
        this.tableSubject$.next(tables);
      });
  }

  /**
   * Gets a table by its number by making a get request to the DB.
   * 
   * @param id the id of the queried table
   * @returns an observable of type Table
   */
  public getTableByNumber(id: number): Observable<Table> {
    return this.httpClient.get<Table>(`${this.restaurantTablesURL}/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
  }

  /**
   * Updates a table by making a put request to the DB.
   * 
   * @param table the table that needs to be updated
   */
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

  /**
   * Gets all unoccupied tables by making a get request to the DB.
   * 
   * @returns an observable of type Table[]
   */
  public getUnoccupiedTables(): Observable<Table[]> {
    let restaurantTablesUnoccupiedURL: string = this.restaurantTablesURL + '/unoccupied'
    return this.httpClient.get<Table[]>(restaurantTablesUnoccupiedURL)
      .pipe(
        map(response => response)
      );
  }

  /**
   * Gets all tables that need help by making a get request to the DB.
   * 
   * @returns an observable of type Table[]
   */
  public getNeedHelpTables(): Observable<Table[]> {
    let restaurantTablesNeedHelpURL: string = this.restaurantTablesURL + '/needHelp'
    return this.httpClient.get<Table[]>(restaurantTablesNeedHelpURL)
      .pipe(
        map(response => response)
      );
  }

  /**
   * Deletes a table from the DB by making a delete request to the DB.
   * 
   * @param table the table that needs to be deleted
   * @returns an observable of type Table
   */
  public deleteTable(table: Table): Observable<Table> {
    return this.httpClient.delete<Table>(`${this.restaurantTablesURL}/${table.tableNumber}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  /**
   * Creates a new table by making a post request to the DB.
   * 
   * @returns an observable of type Table
   */
  public createTable(): Observable<Table> {
    const newTable = new Table;
    newTable.isOccupied = false;
    newTable.isReady = false;
    newTable.needsHelp = false;
    newTable.waiterId = this.currentStaff;
    return this.httpClient.post<Table>(this.restaurantTablesURL, newTable);
  }

  /**
   * Assigns the table to a waiter by making a post request to the DB.
   * 
   * @param table the table the waiter needs to be assigned to
   * @returns an observable of type Table
   */
  public assignTable(table: Table): Observable<Table> {
    return this.httpClient.post<Table>(this.restaurantTablesURL + '/assignTable', table);
  }

  public managerAssignTable(table: Table, staffId: number): Observable<Table> {
    return this.httpClient.put<Table>(this.restaurantTablesURL + `/manager/assignTable/${staffId}/${table.tableNumber}`, table);
  }
}
