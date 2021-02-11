import {Meal} from './Meal';

export class Order {
  id: number;
  meal: Meal[];
  isDelivered: boolean;
  customerTableNum: number;
  waiterId: number;
}
