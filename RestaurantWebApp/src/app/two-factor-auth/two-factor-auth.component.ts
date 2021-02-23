import { Component, OnInit } from '@angular/core';
import { Login } from 'src/models/Login';
import { InputService } from './login-input.service';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.sass']
})
export class TwoFactorAuthComponent implements OnInit {
    otp: number;
    login: Login = new Login;
  constructor(private input: InputService) { }

    ngOnInit(): void {
        this.login = this.input.retrieveLogin();
    }

    onOtpChange(otp) {
        this.otp = otp;
      }
    
    onSubmit() { 
        console.log(this.otp);
    }

}
