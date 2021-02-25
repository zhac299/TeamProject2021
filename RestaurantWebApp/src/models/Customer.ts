import {Table} from "./Table";
import {Order} from "./Order";

export class Customer{
    id: number;
    table: Table;
    isReady: boolean;
    orders: Order[];
}
