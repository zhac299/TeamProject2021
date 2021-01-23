import { Component, OnInit } from '@angular/core';
import { InputService } from './login-input.service';

@Component({
    selector: 'app-login-input',
    templateUrl: './login-input.component.html',
    styleUrls: ['./login-input.component.sass']
})
export class InputComponent implements OnInit {

    username: string = "";
    password: string = "";

    constructor(private input: InputService) { }

    ngOnInit(): void {
    }
    
    onSubmit() {
        const login = {
            username: this.username,
            password: this.password
        }
        
        if (login.username.length >= 6 && login.password.length >= 6) {
            this.input.getLogin(login);
        } else { 
            console.log("Enter your username and password!");
        }

        this.username = "";
        this.password = "";
    }
}