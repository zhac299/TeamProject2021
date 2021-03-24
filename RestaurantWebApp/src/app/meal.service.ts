import { Injectable } from '@angular/core';
import {Meal} from '../models/Meal';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Service for create, read, update, delete Meals from the Restaurant Api
 */
@Injectable({
  providedIn: 'root'
})
export class MealService {

  /**
   * URL for the meals in the Api
   */
  mealsURL = 'http://localhost:8080/api/v1/meals';

  constructor(private httpClient: HttpClient) { }

  /**
   * Create a new meal
   * @param meal to be created
   */
  createNewMeal(meal: Meal): Observable<Meal> {
    return this.httpClient.post<Meal>(this.mealsURL, meal);
  }

  /**
   * Delete a meal
   * @param meal to be deleted
   */
  deleteMeal(meal: Meal): Observable<Meal> {
    return this.httpClient.delete<Meal>(`${this.mealsURL}/${meal.id}`);
  }

  /**
   * Update a meal
   * @param meal to be updated
   */
  updateMeal(meal: Meal): void {
    this.httpClient.put<Meal>(`${this.mealsURL}/${meal.id}`,meal);
  }

  /**
   * Update number of selections in a meal
   * @param meal to update the number of selections of
   */
  updateNumberSelections(meal: Meal): void {
    let updateNumberSelectionsUrl = this.mealsURL + "/numberSelections";
    this.httpClient.put<Meal>(`${updateNumberSelectionsUrl}/${meal.id}/${meal.numberSelections}`,meal).subscribe((meal)=>{
    });
  }
}
