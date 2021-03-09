import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Staff} from "../../../models/Staff";
import {StaffService} from "../../staff.service"

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.sass']
})
export class AddStaffComponent implements OnInit {

  constructor(private staffService: StaffService,
    public dialog: MatDialog) { }

  staffs: Staff[] = [];

  ngOnInit(): void {
    this.staffService.getStaffs().subscribe((staff) => {
      this.staffs = staff;
      console.log(this.staffs)
    });
  }

}
