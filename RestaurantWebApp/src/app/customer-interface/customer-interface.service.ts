import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CustomerInterfaceService {

  dataBase = 'http://localhost:3000/Customer';
  constructor(private httpClient: HttpClient) { }

  public getMenu(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.dataBase)
      .pipe(
        map(response => response)
      );
  }
}