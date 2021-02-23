import { Component, OnInit } from '@angular/core';
import { InputService } from './login-input.service';
import { Login } from 'src/models/Login';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.sass']
})
export class TwoFactorAuthComponent implements OnInit {
    otp: number;
    login: Login = new Login;
  constructor() { }

    ngOnInit(private input: InputService): void {
      
    
    }

    onOtpChange(otp) {
        this.otp = otp;
      }
    
    onSubmit() { 
        this.login = this.input.retrieveLogin();
        console.log(this.otp);
    }

}
