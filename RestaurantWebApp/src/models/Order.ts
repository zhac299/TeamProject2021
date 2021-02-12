import {Meal} from './Meal';

export class Order {
  id: number;
  meal: Meal[];
  category: String
  isDelivered: boolean;
  customerTableNum: number;
  waiterId: number;
}
