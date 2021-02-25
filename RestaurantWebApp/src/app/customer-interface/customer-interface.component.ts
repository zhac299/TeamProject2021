import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';
import { ActivatedRoute } from '@angular/router';

import { MenuService} from "../menu.service";
import { MenuFilterService} from "../menu-filter.service";
import { Menu } from "../../models/Menu";
import { selectedCategory } from "../../models/selectedCategory";
import { Customer } from 'src/models/Customer';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';

interface Food {
  viewValue: string;
  mappedOrders: Order[];
  selected: boolean;
}

@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.component.html',
  styleUrls: ['./customer-interface.component.sass'],
})
export class CustomerInterfaceComponent implements OnInit {

  menu: Menu[];
  cat: selectedCategory = new selectedCategory;
  paramsObject: any;
  customerID: number;
  customer: Observable<Customer>;

  constructor(private menuService: MenuService,
              private customerService: CustomerService,
              private menuFilterService: MenuFilterService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.customerID = this.paramsObject.params.customerID;
    });

    this.customer = this.customerService.getCustomerByID(this.customerID)

    //this.customer.subscribe((newCustomer) => {console.log(newCustomer)});

    this.menuService.getAllUpdatedMenus();
    this.menuService.menus$.subscribe((menu)=> {
        this.menu=menu;
    });
    this.cat = this.menuService.getCat();
  }

  filter(filterArgs: string): void {
      this.menuFilterService.filter(filterArgs).subscribe(orders => {
          this.menuService.setCat(orders);
    });
  }
}
