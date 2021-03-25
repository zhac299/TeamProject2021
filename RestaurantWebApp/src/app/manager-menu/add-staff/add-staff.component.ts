import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Staff } from "../../../models/Staff";
import { StaffService } from "../../staff.service"
import { AddStaffDialogComponent } from '../add-staff-dialog/add-staff-dialog.component';
import {SalesDialogComponent} from "./sales-dialog/sales-dialog.component";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.sass']
})

/**
 * The class that handles the staff page.
 */
export class AddStaffComponent implements OnInit {

  /**
   * The constructor of the class.
   * 
   * @param staffService the staff service that is used to make requests
   * @param dialog a mat dialog
   */
  constructor(private staffService: StaffService,
    public dialog: MatDialog) { }

  /**
   * The list of staff in the DB.
   */
  staffs: Staff[] = [];
  bool: boolean = false;
  subscription: Subscription;
  refreshTimer$ = timer(0, 1000);

  /**
   * A set-up method that gets called once when the class gets instantiated.
   * Makes a get request to the staff DB by subscribing to getStaffs() that returns a 
   * staff observable. Inside the subscription, for each staff, it displays the total 
   * number of orders delivered by the staff and the sales done by the staff.
   */
  ngOnInit(): void {
    this.subscription = this.refreshTimer$.subscribe(this.staffService.refresh$);
    this.staffService.staff$.subscribe((staff) => {
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

  /**
   * Opens the staff dialog.
   * Injects a new Staff object and title and after closing the dialog
   * it creates a new staff.
   */
  openAddStaffDialog() {
    const title = "Add New Staff";
    let staff: Staff = new Staff();
    this.staffService.edit = false;
    const dialogRef = this.dialog.open(AddStaffDialogComponent, {
      data: { staff, title },
      width: '50%',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(staff => {
      if (staff && staff.userName && staff.email && staff.password) {
        this.staffService.createStaff(staff).subscribe((st) => {
          this.staffService.getStaffs().subscribe((stt) => {
            this.staffs = stt;
          });
        });
      }
    })
  }

  /**
   * Opens the edit menu dialog.
   * After the dialog is closed, it updates the staff.
   * 
   * @param staff the staff to be edited
   */
  openEditMenuDialog(staff: Staff): void {
    const title = "Edit Staff";
    this.staffService.edit = true;
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

  openStaffSalesDialog(staff: Staff): void {
    this.dialog.open(SalesDialogComponent, {
      data: staff
    });
  }

  deleteStaff(staff: Staff) {
    this.staffService.deleteStaff(staff);
  }
}
