import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.sass']
})
export class TwoFactorAuthComponent implements OnInit {
    otp: number;
  constructor() { }

    ngOnInit(): void {
      
    
    }

    onOtpChange(otp) {
        this.otp = otp;
      }
    
    onSubmit() { 
        
        console.log(this.otp);
    }

}
