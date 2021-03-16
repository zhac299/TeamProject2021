import { Component, ElementRef, OnInit} from '@angular/core';
import { Login } from 'src/models/Login';
import { InputService } from './login-input.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

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
    loginTwo: Login = undefined;
    html: string = "";

    constructor(
        private input: InputService,
        private router:Router,
        private elementRef: ElementRef,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
    }
    
    onSubmit() {           
        this.input.getLogin(this.username, this.password).subscribe(user => {
            try {
                this.loginTwo = user[0];
                if (Object.keys(this.loginTwo).length > 0) {
                    if(user[0].waiter) {
                        this.router.navigateByUrl('waiter-menu');   
                    } else {
                        this.router.navigateByUrl('kitchen-menu');
                    }              
                }
            } catch {
                this.correct = false;
                this.openSnackBar("Login Credentials are wrong!","Try again")
            }
        });
        this.username = "";
        this.password = "";
    }

    goHome(): void {
        this.router.navigateByUrl('/home');
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          panelClass: ['orderSnackBar']
        });
    }
}