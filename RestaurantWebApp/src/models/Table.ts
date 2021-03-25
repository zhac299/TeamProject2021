import {Customer} from './Customer';
import { Staff } from './Staff';

/**
 * Table object with information of customer and if customer needs help, is ready to order
 * or if the table is occupied.
 */
export class Table {

  /**
   * Table Id
   */
  tableNumber: number;

  /**
   * Whether table is occupied by customer(s)
   */
  isOccupied: boolean;

  /**
   * If anyone at the table needs help
   */
  needsHelp: boolean;

  /**
   * Whether table is ready to order
   */
  isReady: boolean;

  /**
   * Customers at this table
   */
  customer: Customer[];

  /**
   * Id of waiter serving this table
   */
  waiterId: number;
}
