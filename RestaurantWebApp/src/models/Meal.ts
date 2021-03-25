import { Order } from "./Order";
import { Menu } from "./Menu";

/**
 * Meal object with id, menu item, order and number of selections per meal
 */
export class Meal {

  /**
   * The id of the meal.
   */
  id: number;

  /**
   * The menu item associated with the meal.
   */
  menu: Menu;

  /**
   * The order associated with the meal.
   */
  order: Order;

  /**
   * The number of selections of the meal.
   */
  numberSelections: number;
}
