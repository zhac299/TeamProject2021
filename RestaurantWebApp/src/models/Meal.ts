import {Order} from "./Order";
import {Menu} from "./Menu";

export class Meal{
  id: number;
  menu: Menu;
  order: Order;
  selections: number;
}
