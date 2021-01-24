import { Component, OnInit } from '@angular/core';
import { Login } from 'src/models/Login';
import { InputService } from './login-input.service';
import { Router } from '@angular/router'

@Component({
    selector: 'app-login-input',
    templateUrl: './login-input.component.html',
    styleUrls: ['./login-input.component.sass']
})
export class InputComponent implements OnInit {

    username: string = "";
    password: string = "";
    staff: string = "";
    html: string = "";

    constructor(private input: InputService, private router:Router) { }
    loginTwo: Login[] = [];
    ngOnInit(): void {
    }
    
    onSubmit() {
        const login2 = {
            username: this.username,
            password: this.password,
            staff: this.staff 
        }
        
        this.input.getLogin().subscribe(login => {
            this.html = "";
            this.loginTwo = login;        
            for (var val of this.loginTwo) { 
                if (val.username == login2.username && val.password == login2.password) {
                    this.router.navigateByUrl('waiter-menu');
                    return;
                }
            }
           this.html = "<p>Enter the correct login details...</p>"
        });
        this.username = "";
        this.password = "";
        this.staff = "";
    }
}