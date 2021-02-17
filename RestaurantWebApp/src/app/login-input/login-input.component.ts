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

        this.input.getLogin(this.username, this.password).subscribe(login => {
            console.log(login);
            //this.loginTwo = login;
        });
}