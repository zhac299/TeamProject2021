import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/Order";
import {map} from "rxjs/operators";
import {Drink} from "../models/Drink";

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  mockDbUrl = 'http://localhost:3000/drinks';

  constructor(private httpClient: HttpClient) { }

  // Making an Http request to the database
  public getOrders(): Observable<Drink[]> {
    return this.httpClient.get<Drink[]>(this.mockDbUrl)
      .pipe(
        map(response => response)
      );
  }
}
