/**
 * Staff object with id, email, username, password, isWaiter, sales prices and boolean to
 * check if they have delivered their outstanding orders that they are waiting.
 */
export class Staff{
  id: number;
  email: string;
  userName: string;
  password: string;
  waiter: boolean;
  salesPrice: number;
  orderDelivered: number
}
