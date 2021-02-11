import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from 'src/models/Meal';
import { Order } from 'src/models/Order';
import { AllergensChipsComponent} from '../../customer-interface/allergens-chips/allergens-chips.component';

@Injectable({
  providedIn: 'root'
})
export class MenuFilterDbService {

  filteredDB = 'http://localhost:8080/api/v1/menu/filter';
  s = '';
  constructor(private httpClient: HttpClient, private allergensChipsComponent: AllergensChipsComponent) { }

  public filter(): Observable<Meal[]> {
    this.s = this.allergensChipsComponent.getAllergens();
    //console.log(this.s);
    this.filteredDB = this.filteredDB.concat(this.s,"200");
    console.log(this.filteredDB);
    return this.httpClient.get<Meal[]>(this.filteredDB)
      .pipe(
        map(response => response)
      );
  }
}
