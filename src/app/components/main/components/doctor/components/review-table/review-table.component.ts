import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DOCTOR_TABLE_COLUMNS, DOCTOR_TABLE_DATA } from '@assets/constants/doctor.constants';

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.scss']
})
export class ReviewTableComponent {
 tableCategories = Object.keys(DOCTOR_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData = DOCTOR_TABLE_DATA;
  tableColumns = DOCTOR_TABLE_COLUMNS;
  constructor(private router: Router) {}

  handleAction(event: { action: string; row: any }) {
    console.log(`${event.action} clicked for`, event.row);
  }
}
