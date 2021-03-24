import {Meal} from './Meal';
import {Table} from './Table';
import {Customer} from "./Customer";

/**
 * Order object with id, meal, category, table, waiter id, time of placed order,
 * customer assigned to order, table assigned to order, total of order and
 * status of order: isPaid,isReady, isConfirmed and is delivered.
 */
export class Order {
  id: number;
  meal: Meal[];
  category: string;
  isDelivered: boolean;
  isConfirmed: boolean;
  isReady: boolean;
  table: Table;
  waiterId: number;
  isPaid:boolean;
  total:number;
  orderPlacedTime: string;
  customer: Customer;
}
