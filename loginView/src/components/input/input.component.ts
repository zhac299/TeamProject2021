import { Component, OnInit } from '@angular/core';
import { InputService } from '../../services/input.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.sass']
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
            this.input.queryDatabase(login);
        } else { 
            console.log("Enter your username and password!");
        }

        this.username = "";
        this.password = "";
    }
}