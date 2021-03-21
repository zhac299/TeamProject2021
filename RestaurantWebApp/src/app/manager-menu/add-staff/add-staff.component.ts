import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Staff } from "../../../models/Staff";
import { StaffService } from "../../staff.service"
import { AddStaffDialogComponent } from '../add-staff-dialog/add-staff-dialog.component';

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
      if (this.staffs && this.staffs.length > 0) {
        this.staffs.forEach((item, index) => {
          this.staffService.getSales(item.id).subscribe((sale) => {
            item.orderDelivered = 0;
            item.salesPrice = 0;
            if (sale && sale.length > 0) {
              item.orderDelivered = sale.length;
              sale.forEach((sa, index) => {
                item.salesPrice += sa.total;
              });
            }
          });
        });
      }
    });
  }



  openAddMenuDialog() {
    const title = "Add New Staff";
    let staff: Staff = new Staff();
    const dialogRef = this.dialog.open(AddStaffDialogComponent, {
      data: { staff, title },
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(staff => {
      if (staff && staff.userName && staff.email && staff.password) {
        console.log(staff)
        this.staffService.createStaff(staff).subscribe((st) => {
          this.staffService.getStaffs().subscribe((stt) => {
            this.staffs = stt;
          });
        });
      }
    })
  }



  openEditMenuDialog(staff: Staff): void {
    const title = "Edit Staff";
    const dialogRef = this.dialog.open(AddStaffDialogComponent, {
      data: { staff, title },
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (staff) {
        this.staffService.updateStaff(staff).subscribe((st) => {
          this.staffService.getStaffs().subscribe((stt) => {
            this.staffs = stt;
          });
        });
      }
    });

  }

}
