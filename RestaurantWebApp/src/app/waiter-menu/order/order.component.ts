import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Table} from '../../../models/Table';
import {TableService} from '../../table.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  table: Table;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.getTable();
  }

  getTable(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tableService.getTable(id)
      .subscribe(table => this.table = table);
  }

  goBack(): void {
    this.location.back();
  }

}
