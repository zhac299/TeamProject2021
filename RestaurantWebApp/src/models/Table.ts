import {Customer} from './Customer';

export class Table {
  tableNumber: number;
  isOccupied: boolean;
  needsHelp: boolean;
  isReady: boolean;
  customer: Customer[];
}
