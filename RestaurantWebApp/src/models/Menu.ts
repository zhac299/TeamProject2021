import { MenuCategory } from "./MenuCategory";
import { Ingredient } from "./Ingredient";

/**
 * Menu object with id, name, category, price, ingredients, picture Url and allergens
 */
export class Menu {

  /**
   * The id of the menu item.
   */
  id: number;

  /**
   * The name of the menu item.
   */
  name: string;

  /**
   * The category associated with the menu item.
   */
  category: MenuCategory;

  /**
   * Asserts if a menu item was suggested.
   */
  suggested: string = "no";

  /**
   * The description of the menu item.
   */
  description: string;

  /**
   * The price of the menu item.
   */
  price: number;

  /**
   * The picture URL used to display the picture associated with the menu item.
   */
  pictureUrl: string;

  /**
   * Asserts if the menu item has peanuts.
   */
  peanuts: boolean;

  /**
   * Asserts if the menu item has celery.
   */
  celery: boolean;

  /**
   * Asserts if the menu item has gluten.
   */
  gluten: boolean;

  /**
   * Asserts if the menu item has crustaceans.
   */
  crustaceans: boolean;

  /**
   * Asserts if the menu item has eggs.
   */
  eggs: boolean;

  /**
   * Asserts if the menu item has fish.
   */
  fish: boolean;

  /**
   * Asserts if the menu item has lupin.
   */
  lupin: boolean;

  /**
   * Asserts if the menu item has milk.
   */
  milk: boolean;

  /**
   * Asserts if the menu item has molluscs.
   */
  molluscs: boolean;

  /**
   * Asserts if the menu item has mustarrd.
   */
  mustard: boolean;

  /**
   * Asserts if the menu item has mustard.
   */
  nuts: boolean;
  
  /**
   * Asserts if the menu item has soya.
   */
  soya: boolean;

  /**
   * Asserts if the menu item has sesame seeds.
   */
  sesameSeeds: boolean;

  /**
   * Asserts if the menu item has sulphites.
   */
  sulphites: boolean;

  /**
   * The number of calories of the menu item.
   */
  calories: number;

  /**
   * The time to cook the menu item.
   */
  timeToCook: number;

  /**
   * The ingredients associated with the menu item.
   */
  ingredients: Ingredient[];

  /**
   * The name of the ingrdients.
   */
  ingredientsName: string;
}
