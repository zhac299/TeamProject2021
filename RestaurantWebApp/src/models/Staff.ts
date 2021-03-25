/**
 * Staff object with id, email, username, password, isWaiter, sales prices and boolean to
 * check if they have delivered their outstanding orders that they are waiting.
 */
export class Staff{

  /**
   * Id of staff
   */
  id: number;

  /**
   * Staff email address
   */
  email: string;

  /**
   * Staff user name
   */
  userName: string;

  /**
   * Staff password
   */
  password: string;

  /**
   * Whether staff is waiter
   */
  waiter: boolean;

  /**
   * Whether staff is manager
   */
  manager: boolean;

  /**
   * Price of sales made by staff
   */
  salesPrice: number;

  /**
   * Number of orders delivered
   */
  orderDelivered: number
}
