import {Order} from "./Order";
import {Menu} from "./Menu";

/**
 * Meal object with id, menu item, order and number of selections per meal
 */
export class Meal{
  id: number;
  menu: Menu;
  order: Order;
  numberSelections: number;
}
