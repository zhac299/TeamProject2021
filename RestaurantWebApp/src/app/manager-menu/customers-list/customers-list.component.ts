import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';
import { Client } from '../../../models/Client';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.sass']
})
export class CustomersListComponent implements OnInit {

  constructor(private clientService: ClientService,) { }

  clients: Client[] = [];

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      console.log(clients)
      this.clients = clients;
    });
  }

}
