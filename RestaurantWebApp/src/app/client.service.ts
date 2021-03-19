import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Client} from '../models/Client';
import {exhaustMap, map, repeat, share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {
    console.log('Instance created');
  }

  restaurantWebApiUrl = 'http://localhost:8080/api/v1/client';

  public getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.restaurantWebApiUrl);
  }

  create(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.restaurantWebApiUrl, client);
  }

  update(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(this.restaurantWebApiUrl + '/'+client.id, client);
  }

  delete(client: Client): Observable<Client> {
    return this.httpClient.delete<Client>(`${this.restaurantWebApiUrl}/${client.id}`);
  }
}
