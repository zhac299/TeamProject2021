import { Component, ElementRef, OnInit } from '@angular/core';
import { InputService } from './login-input.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login-input',
    templateUrl: './login-input.component.html',
    styleUrls: ['./login-input.component.sass']
})

/**
 * The class that handles the staff login.
 */
export class LoginInputComponent implements OnInit {

    /**
     * The username of the staff.
     */
    username: string;

    /**
     * The password of the staff.
     */
    password: string = "";

    /**
     * Asserts if the login credentials are correct.
     */
    correct: boolean = true;

    /**
     * The html url.
     */
    html: string = "";

    /**
     * The cosntuctor of the class.
     * 
     * @param input the input of forms
     * @param router an activated router that gets used when routing to to the staff's menu
     * @param elementRef an elem ref
     * @param snackBar a snack bar
     */
    constructor(
        private input: InputService,
        private router: Router,
        private elementRef: ElementRef,
        private snackBar: MatSnackBar) { }

    /**
     * A set-up method that gets called once when the class gets instantiated.
     */
    ngOnInit(): void { }

    /**
     * Handles the login logic. 
     * It makes a get request to the Staff DB to check the credentials and 
     * if correct, it creates an activated route to the corresponding staff page
     * with the staffId as params. Otherwise, it opens a snack bar telling the user
     * the credentials are wrong.
     */
    onSubmit() {
        this.input.getLogin(this.username, this.password).subscribe(user => {
            try {
                if (Object.keys(user[0]).length > 0) {
                    if (user[0].waiter) {
                        this.router.navigate(['/waiter-menu'],
                            { queryParams: { staffId: user[0].id } });
                    } else {
                        this.router.navigateByUrl('kitchen-menu');
                    }
                }
            } catch {
                this.correct = false;
                this.openSnackBar("Login Credentials are wrong!", "Try again")
            }
        });
        this.username = "";
        this.password = "";
    }

    /**
     * Routes back to the home page.
     */
    goHome(): void {
        this.router.navigateByUrl('/home');
    }

    /**
     * Opens a snack bar to inform the user the inputed login credentials are wrong.
     * 
     * @param message the snack bar message
     * @param action the snack bar action
     */
    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: ['orderSnackBar']
        });
    }
}