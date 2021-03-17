import {MenuCategory} from "./MenuCategory";

export class Menu{
  id: number;
  name: string;
  category: MenuCategory;
  suggested: string = "no";
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
  calories: number;
  timeToCook: number;
  ingredients: number[];
}
