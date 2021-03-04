import {Meal} from './Meal';
import {Table} from './Table';
import {Customer} from "./Customer";

export class Order {
  id: number;
  meal: Meal[];
  category: string;
  isDelivered: boolean;
  table: Table;
  waiterId: number;
  date: Date;
  isPaid:boolean;
  total:number;
  customer: Customer;
}
