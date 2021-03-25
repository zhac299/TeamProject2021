/**
 * Login object with id, username, password, email and waiter boolean
 */
export class Login {

    /**
     * The id of the login session.
     */
    id: number;

    /**
     * The username of the staff.
     */
    userName: string;

    /**
     * The password of the staff.
     */
    password: string;

    /**
     * The email of the staff.
     */
    email: string;

    /**
     * Asserts if the staff is waiter.
     */
    waiter: boolean;

    /**
     * Asserts if the staff is a manager.
     */
    manager: boolean;

    /**
     * The otp of the login.
     */
    otp!: number;
  }
