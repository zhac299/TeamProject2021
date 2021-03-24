import {Table} from "./Table";
import {Order} from "./Order";

/**
 * Customer model with id, table, and orders
 */
export class Customer{
    id: number;
    table: Table;
    orders: Order[];
}
