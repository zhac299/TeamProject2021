import { Injectable } from '@angular/core';
import {Meal} from '../models/Meal';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  mealsURL = 'http://localhost:8080/api/v1/meals';

  constructor(private httpClient: HttpClient) { }

  createNewMeal(meal: Meal): Observable<Meal> {
    return this.httpClient.post<Meal>(this.mealsURL, meal);
  }
}
