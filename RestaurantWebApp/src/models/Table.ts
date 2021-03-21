import {Customer} from './Customer';
import { Staff } from './Staff';

export class Table {
  tableNumber: number;
  isOccupied: boolean;
  needsHelp: boolean;
  isReady: boolean;
  customer: Customer[];
  waiterId: number;
}