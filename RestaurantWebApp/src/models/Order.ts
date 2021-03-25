import {Meal} from './Meal';
import {Table} from './Table';
import {Customer} from "./Customer";

/**
 * Order object with id, meal, category, table, waiter id, time of placed order,
 * customer assigned to order, table assigned to order, total of order and
 * status of order: isPaid,isReady, isConfirmed and is delivered.
 */
export class Order {

  /**
   * Id for Order
   */
  id: number;

  /**
   * Meals ordered
   */
  meal: Meal[];

  /**
   * Category of order
   */
  category: string;

  /**
   * If order has been delivered
   */
  isDelivered: boolean;

  /**
   * If order has been confirmed
   */
  isConfirmed: boolean;

  /**
   * If order is ready to be served
   */
  isReady: boolean;

  /**
   * Table the order is placed in
   */
  table: Table;

  /**
   * Waiter serving this order
   */
  waiterId: number;

  /**
   * If order has been paid by customer
   */
  isPaid:boolean;

  /**
   * Total bill price of order
   */
  total:number;

  /**
   * Time order has been placed
   */
  orderPlacedTime: string;

  /**
   * Customer that order belongs to
   */
  customer: Customer;
}
