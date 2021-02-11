import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/models/Order';

@Injectable({
  providedIn: 'root'
})
export class MenuFilterDbService {

  filteredDB = 'http://localhost:8080/api/v1/menu/filter';

  constructor(private httpClient: HttpClient) { }

  public filter(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.filteredDB)
      .pipe(
        map(response => response)
      );
  }
}
