import {Order} from "./Order";

export class Meal{
  id: number;
  name: string;
  description: string;
  price: number;
  peanuts: boolean;
  celery: boolean;
  gluten: boolean;
  crustaceans: boolean;
  eggs: boolean;
  fish: boolean;
  lupin: boolean;
  milk: boolean;
  molluscs: boolean;
  mustard: boolean;
  nuts: boolean;
  soya: boolean;
  sesameSeeds: boolean;
  sulphites: boolean;
  calories: number
  nrSelections: number
  // tslint:disable-next-line:variable-name
  menu_id: number;
  order: Order[];
}
