import { Component, OnInit} from '@angular/core';
import { Login } from 'src/models/Login';
import { InputService } from './login-input.service';
import { Router } from '@angular/router'

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

    constructor(private input: InputService, private router:Router) { }
    ngOnInit(): void {
    }
    
    onSubmit() {
            
            this.input.getLogin(this.username, this.password).subscribe(login => {
                try {
                    this.loginTwo = login[0];
                    if (Object.keys(this.loginTwo).length > 0 && this.waiter == true) {
                        this.router.navigateByUrl('waiter-menu');
                        // activated route
                    }
                } catch {
                    this.correct = false;
                }
            });
        this.username = "";
        this.password = "";
    }

    isKitchen() {
        this.kitchen = true
        this.waiter = false;
    }
    isWaiter() {
        this.waiter = true;
        this.kitchen = false; 
    }
}