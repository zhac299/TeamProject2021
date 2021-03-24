import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../models/Ingredient';

/**
 * Service to create, read, update and delete ingredients
 */
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient: HttpClient) {
    console.log('Instance created');
  }

  /**
   * URL for ingredients in Api
   */
  restaurantWebApiUrl = 'http://localhost:8080/api/v1/stock';

  /**
   * Get list of all ingredients
   */
  public getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.restaurantWebApiUrl);
  }

  /**
   * Get an ingredient by id
   * @param ingredientId
   */
  public getIngredientById(ingredientId: number) {
    this.httpClient.get<Ingredient>(`${this.restaurantWebApiUrl}/${ingredientId}`)
  }

  /**
   * Create an ingredient
   * @param ingredient to create
   */
  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(this.restaurantWebApiUrl, ingredient);
  }

  /**
   * Update ingredient
   * @param ingredient to update
   */
  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.put<Ingredient>(this.restaurantWebApiUrl + '/'+ingredient.id, ingredient);
  }

  /**
   * Delete an ingredient
   * @param ingredient to delete
   */
  deleteIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.delete<Ingredient>(`${this.restaurantWebApiUrl}/${ingredient.id}`);
  }
}
