import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Ingredient} from '../models/Ingredient';
import {exhaustMap, map, repeat, share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient: HttpClient) {
    console.log('Instance created');
  }

  restaurantWebApiUrl = 'http://localhost:8080/api/v1/stock';

  public getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.restaurantWebApiUrl);
  }

  createIngredient(staff: Ingredient): Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(this.restaurantWebApiUrl, staff);
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.put<Ingredient>(this.restaurantWebApiUrl + '/'+ingredient.id, ingredient);
  }

  deleteIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.delete<Ingredient>(`${this.restaurantWebApiUrl}/${ingredient.id}`);
  }
}
