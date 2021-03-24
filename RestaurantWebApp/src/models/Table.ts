import {Customer} from './Customer';
import { Staff } from './Staff';

/**
 * Table object with information of customer and if customer needs help, is ready to order
 * or if the table is occupied.
 */
export class Table {
  tableNumber: number;
  isOccupied: boolean;
  needsHelp: boolean;
  isReady: boolean;
  customer: Customer[];
  waiterId: number;
}
