import {Meal} from './Meal';
import {Table} from './Table';
import {Customer} from "./Customer";

export class Order {
  id: number;
  meal: Meal[];
  category: string;
  isDelivered: boolean;
  isConfirmed: boolean;
  table: Table;
  waiterId: number;
  orderPlacedTime: string;
  customer: Customer;
}
