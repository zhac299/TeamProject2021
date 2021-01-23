import { Component, OnInit } from '@angular/core';
import { Login } from 'src/models/Login';
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
    loginTwo: Login[] = [];
    ngOnInit(): void {
    }
    
    onSubmit() {
        const login2 = {
            username: this.username,
            password: this.password
        }
        
    
        this.input.getLogin().subscribe( login => {
            this.loginTwo = login;        
            for (var val of this.loginTwo) { 
                if (val.username == login2.username && val.password == login2.password) {
                    console.log("Welcome " + login2.username);
                    return;
                }
            }
            console.log("Enter the right details...");
        });
        this.username = "";
        this.password = "";
    }
}