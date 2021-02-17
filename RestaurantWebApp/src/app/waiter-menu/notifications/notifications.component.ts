import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  numberOfSelections: number;

  constructor() { }

  ngOnInit(): void {
  }

}
