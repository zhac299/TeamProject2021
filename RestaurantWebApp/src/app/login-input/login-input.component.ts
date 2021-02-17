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

    username: string = "";
    password: string = "";
    staff: string = "";
    waiter: boolean = false;
    kitchen: boolean = false;
    
    html: string = "";
    link: string = "google.co.uk";

    constructor(private input: InputService, private router:Router) { }
    loginTwo: Login[] = [];
    ngOnInit(): void {
    }
    
    onSubmit() {
        const login2 = {
            username: this.username,
            password: this.password,
            waiter: this.waiter,
            kitchen: this.kitchen
        }

        this.input.getLogin(this.username, this.password).subscribe(login => {
            this.loginTwo = login; 
            console.log(login);
        });
        
        this.username = "";
        this.password = "";
        this.staff = "";
        this.waiter = false;
        this.kitchen = false;
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