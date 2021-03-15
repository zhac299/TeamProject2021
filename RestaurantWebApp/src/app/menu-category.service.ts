import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategory } from 'src/models/MenuCategory';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryService {

  menuCategoryURL = "http://localhost:8080/api/v1/menuCategory";

  constructor(private httpClient: HttpClient) { }

  public getMenuCategories(): Observable<MenuCategory[]> {
    return this.httpClient.get<MenuCategory[]>(this.menuCategoryURL);
  }

  public getMenuCategory(id: number): Observable<MenuCategory> {
    return this.httpClient.get<MenuCategory>(`${this.menuCategoryURL}/${id}`);
  }

  createNewCategory(category: MenuCategory): Observable<MenuCategory> {
    return this.httpClient.post<MenuCategory>(this.menuCategoryURL, category);
  }

  deleteCategory(category: MenuCategory): void {
    this.httpClient.delete<MenuCategory>(`${this.menuCategoryURL}/${category.id}`);
  }

  updateCategory(category: MenuCategory): Observable<MenuCategory> {
    return this.httpClient.put<MenuCategory>(`${this.menuCategoryURL}/${category.id}`,category);
  }
}
