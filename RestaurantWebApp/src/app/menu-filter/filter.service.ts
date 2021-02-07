import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/Order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
   
    mockDbUrl = 'http://localhost:3000/Orders'
   
    constructor(private httpClient: HttpClient) { }
    
    getOrders(): Observable<Order[]> { 
        
        return this.httpClient.get<Order[]>(this.mockDbUrl)
        
        .pipe(
          map(response => response)
        );
    }
}
