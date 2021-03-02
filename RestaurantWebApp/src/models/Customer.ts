import {Table} from "./Table";
import {Order} from "./Order";

export class Customer{
    id: number;
    table: Table;
    orders: Order[];
}
