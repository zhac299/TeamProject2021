import {MenuCategory} from "./MenuCategory";
import {Ingredient} from "./Ingredient";

/**
 * Menu object with id, name, category, price, ingredients, picture Url and allergens
 */
export class Menu{
  id: number;
  name: string;
  category: MenuCategory;
  suggested: string = "no";
  description: string;
  price: number;
  pictureUrl: string;
  peanuts: boolean;
  celery: boolean;
  gluten: boolean;
  crustaceans: boolean;
  eggs: boolean;
  fish: boolean;
  lupin: boolean;
  milk: boolean;
  molluscs: boolean;
  mustard: boolean;
  nuts: boolean;
  soya: boolean;
  sesameSeeds: boolean;
  sulphites: boolean;
  calories: number;
  timeToCook: number;
  ingredients: Ingredient[];
  ingredientsName: string;
}
