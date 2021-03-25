/**
 * Login object with id, username, password, email and waiter boolean
 */
export class Login {
    id: number;
    userName: string;
    password: string;
    email: string;
    waiter: boolean;
    manager: boolean;
    otp!: number;
  }
