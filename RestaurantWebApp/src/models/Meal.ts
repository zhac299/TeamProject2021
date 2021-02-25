import {Order} from "./Order";
import {Menu} from "./Menu";

export class Meal{
  id: number;
  // tslint:disable-next-line:variable-name
  menu: Menu;
  order: Order;
}
