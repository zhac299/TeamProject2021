import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { CustomerInterfaceComponent } from '../customer-interface.component';

@Component({
  selector: 'app-ready-to-order',
  templateUrl: './ready-to-order.component.html',
  styleUrls: ['./ready-to-order.component.sass']
})
export class ReadyToOrderComponent implements OnInit {

  ready: boolean = false;

  constructor(private customerInterface: CustomerInterfaceComponent, private customerService: CustomerService) { }

  ngOnInit(): void {}

  readyToOrder(): void {
    this.customerInterface.customer.subscribe((customer) => {
      customer.isReady = true;
      this.customerService.updateCustomer(customer).subscribe();
    });
    this.ready = true;
  }

  cancel(): void {
    this.customerInterface.customer.subscribe((customer) => {
      customer.isReady = false;
      this.customerService.updateCustomer(customer).subscribe();
    });
    this.ready = false;
  }

}
