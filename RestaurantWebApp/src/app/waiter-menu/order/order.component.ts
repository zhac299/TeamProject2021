import { Component, OnInit } from '@angular/core';
import {Table} from '../../../models/Table';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  table: Table;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
