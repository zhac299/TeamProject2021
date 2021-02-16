import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import {Menu} from "../../../models/Menu";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent implements OnInit {
  selected = -1;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Menu) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  setCalories(value: number) {
    return value;
  }

  onCaloriesChange(event: MatSliderChange) {
    //console.log(this.data.calories);
    this.data.calories = event.value;
  }
    
  onClick(type: string) { 
    this.data.category = type;
  }  

}
