import {Meal} from './Meal';
import {Table} from './Table';
import {Customer} from "./Customer";

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
