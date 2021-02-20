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
    waiter: boolean = false;
    kitchen: boolean = false;
    
    loginTwo: Login = new Login;
    html: string = "";
    link: string = "google.co.uk";

    constructor(private input: InputService, private router:Router) { }
    ngOnInit(): void {
    }
    
    onSubmit() {

        this.input.getLogin(this.username, this.password).subscribe(login => {
            this.loginTwo = login[0];
            this.router.navigateByUrl("/waiter-menu");
        });

        this.username = "";
        this.password = "";
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