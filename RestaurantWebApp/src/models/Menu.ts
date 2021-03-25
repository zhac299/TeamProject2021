import {MenuCategory} from "./MenuCategory";
import {Ingredient} from "./Ingredient";

/**
 * Menu object with id, name, category, price, ingredients, picture Url and allergens
 */
export class Menu{

  /**
   * Id of Menu item
   */
  id: number;

  /**
   * Name of Menu item
   */
  name: string;

  /**
   * Menu item category
   */
  category: MenuCategory;

  /**
   * Whether menu item is suggested by waiter or not
   */
  suggested: string = "no";

  /**
   * Description of Menu item
   */
  description: string;

  /**
   * Price of menu item
   */
  price: number;

  /**
   * URL picture of menu item
   */
  pictureUrl: string;

  /**
   * Allergen
   */
  peanuts: boolean;

  /**
   * Allergen
   */
  celery: boolean;

  /**
   * Allergen
   */
  gluten: boolean;

  /**
   * Allergen
   */
  crustaceans: boolean;

  /**
   * Allergen
   */
  eggs: boolean;

  /**
   * Allergen
   */
  fish: boolean;

  /**
   * Allergen
   */
  lupin: boolean;

  /**
   * Allergen
   */
  milk: boolean;

  /**
   * Allergen
   */
  molluscs: boolean;

  /**
   * Allergen
   */
  mustard: boolean;

  /**
   * Allergen
   */
  nuts: boolean;

  /**
   * Allergen
   */
  soya: boolean;

  /**
   * Allergen
   */
  sesameSeeds: boolean;

  /**
   * Allergen
   */
  sulphites: boolean;

  /**
   * Amount of Calories in menu item
   */
  calories: number;

  /**
   * Time it takes to cook item
   */
  timeToCook: number;

  /**
   * Ingredients in menu item
   */
  ingredients: Ingredient[];

  /**
   * Name of ingredient object in menu item
   */
  ingredientsName: string;
}
