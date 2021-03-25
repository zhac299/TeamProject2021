import { Table } from "./Table";
import { Order } from "./Order";

/**
 * Customer model with id, table, and orders
 */
export class Customer {

    /**
     * The id of the customer.
     */
    id: number;

    /**
     * The table assigned to the customer.
     */
    table: Table;

    /**
     * The list of orders associated with the customer.
     */
    orders: Order[];
}
