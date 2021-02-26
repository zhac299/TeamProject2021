import { Component, OnInit } from '@angular/core';
import { Login } from 'src/models/Login';
import { InputService } from '../login-input/login-input.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.sass']
})
export class TwoFactorAuthComponent implements OnInit {
    otp: number;
    login: Login = new Login;

  constructor(private input: InputService, private router:Router) { }

    ngOnInit(): void {
    }

    onOtpChange(otp) {
        this.otp = otp;
      }
    
    onSubmit() { 
        this.login = this.input.retrieveLogin();
        console.log(this.otp);
        this.router.navigateByUrl("/waiter-menu");
    }

}
