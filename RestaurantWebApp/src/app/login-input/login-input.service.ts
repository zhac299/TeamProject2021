import { Injectable } from '@angular/core';
import { Login } from 'src/models/Login';

import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InputService {
    mockDbUrl = 'http://localhost:3000/Login';
    
    constructor(private httpClient: HttpClient) { }
    
    public getLogin(): Observable<Login[]> {
        return this.httpClient.get<Login[]>(this.mockDbUrl)
          .pipe(
            map(response => response)
          );
    }
    
}
