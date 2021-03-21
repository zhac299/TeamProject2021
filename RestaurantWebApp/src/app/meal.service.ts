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

  deleteMeal(meal: Meal): Observable<Meal> {
    return this.httpClient.delete<Meal>(`${this.mealsURL}/${meal.id}`);
  }

  updateMeal(meal: Meal): void {
    this.httpClient.put<Meal>(`${this.mealsURL}/${meal.id}`,meal);
  }

  updateNumberSelections(meal: Meal): void {
    let updateNumberSelectionsUrl = this.mealsURL + "/numberSelections";
    this.httpClient.put<Meal>(`${updateNumberSelectionsUrl}/${meal.id}/${meal.numberSelections}`,meal).subscribe((meal)=>{
    });
  }
}
