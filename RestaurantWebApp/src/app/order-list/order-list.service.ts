import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from 'src/models/Meal';
import { Order } from 'src/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  dataBase = 'http://localhost:8080/api/v1/menu';
  constructor(private httpClient: HttpClient) { }

  public getMenu(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(this.dataBase)
      .pipe(
        map(response => response)
      );
  }
}
