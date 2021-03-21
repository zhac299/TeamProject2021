import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from '../../../../models/Client';
import { Menu } from '../../../../models/Menu';
import {ClientService} from "../../../client.service"
import { MenuService } from '../../../menu.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.sass']
})
export class ClientRegisterComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private menuService: MenuService,
    private router:Router,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar) { }

  menuList: Menu[] = [];
  clinet: Client = new Client;

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFDED';
  }

  ngOnInit(): void {
    this.menuService.menus$.subscribe((menu) => {
      this.menuList = menu;
    });
  }

  onSubmit() {
    if(!this.clinet || !this.clinet.name || !this.clinet.name || !this.clinet.name || 
      !this.clinet.name || !this.clinet.name) {
        this.openSnackBar('All fields are mandatory!', '');
        return;
    }
    this.clientService.create(this.clinet).subscribe(user => {
        try {
          this.openSnackBar('You have successfully registered!', '');
          this.clinet = new Client;
        } catch {
            this.openSnackBar("Registration Failed!","Try again")
        }
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['orderSnackBar']
    });
  }

}
