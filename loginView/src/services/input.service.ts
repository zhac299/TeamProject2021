import { Injectable } from '@angular/core';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class InputService {

    constructor() { }
    
    queryDatabase(login: Login) { 
        console.log("connect to database for login here.."); 
       //console.log(login);
       
    }
}
