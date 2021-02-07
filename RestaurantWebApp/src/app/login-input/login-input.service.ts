import { Injectable } from '@angular/core';
import { Login } from 'src/models/Login';

import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InputService {
    private dbUrl;
    
    constructor(private httpClient: HttpClient) {
        this.dbUrl = 'http://localhost:8080/api/v1/staff'
     }
    
    public getLogin(): Observable<Login[]> {
        return this.httpClient.get<Login[]>(this.dbUrl)
          .pipe(
            map(response => response)
          );
    }
    
}
