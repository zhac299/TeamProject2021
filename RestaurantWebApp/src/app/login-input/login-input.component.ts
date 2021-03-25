import { Component, ElementRef, OnInit} from '@angular/core';
import { Login } from 'src/models/Login';
import { InputService } from './login-input.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Staff } from '../../models/Staff';

@Component({
    selector: 'app-login-input',
    templateUrl: './login-input.component.html',
    styleUrls: ['./login-input.component.sass']
})
export class LoginInputComponent implements OnInit {

    username: string;
    password: string = "";
    waiter: boolean = false;
    kitchen: boolean = false;
    correct: boolean = true;   
    html: string = "";
    staff: Staff;

    constructor(
        private input: InputService,
        private router:Router,
        private elementRef: ElementRef,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {}
    
    ngAfterViewInit(): void {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
    }
    /**
     * This method is purposed with taking the staff members login details and passing them to different webpages accordingly.
     */
    onSubmit() {           
        this.input.getLogin(this.username, this.password).subscribe(user => {
            this.staff = user[0];
            try {
                if(this.staff.waiter && !this.staff.manager) {                    
                    this.router.navigate(['/waiter-menu'], 
                    { queryParams: {staffId: user[0].id} });   
                } else if (!this.staff.waiter && this.staff.manager) {
                    this.router.navigate(['/manager-menu'],
                    { queryParams: {staffId: user[0].id} });   
                } else if (!this.staff.waiter && !this.staff.manager) {
                    this.router.navigateByUrl('kitchen-menu');
                } 
            } catch {
                this.correct = false;
                this.openSnackBar("Login Credentials are wrong!","Try again")
            }
        });
        this.username = "";
        this.password = "";
    }
    /**
     * The method purposed with redirecting a user back to the home screen.
     */
    goHome(): void {
        this.router.navigateByUrl('/home');
    }
    /**
     * The method purposed with providing an error message when the wrong credentials are entered.
     * 
     * @param {string} message The message stating what error has occured.
     * @param {string} action The action depicting how a staff member should proceed.
     */
    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          panelClass: ['orderSnackBar']
        });
    }
}