import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hidden = false;

  // toggleBadgeVisibility() {
  //   this.hidden = !this.hidden;
  // }

}
